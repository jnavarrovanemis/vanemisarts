import { serverSupabaseServiceRole } from '#supabase/server'
import { z } from 'zod'
import { PERMISSIONS } from '#shared/utils/permissions'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const publicRegistration = runtimeConfig.public.allowPublicSignup === 'true'

  let creatorRole = 'public'

  if (!publicRegistration) {
    const profile = await getAuthorizedProfile(event, PERMISSIONS.USERS_CREATE)

    if (!profile) {
      throw createError({
        statusCode: 403,
        statusMessage: 'No tienes autorización para crear nuevos usuarios.'
      })
    }
    creatorRole = profile.role as string
  }

  // 🛡️ Roles permitidos según quien crea — prevención de escalada de privilegios
  const allowedRoles = creatorRole === 'admin'
    ? (['admin', 'employee', 'client'] as const)
    : (['client'] as const)

  const RegisterSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    role: z.enum(allowedRoles)
  })

  const body = await readBody(event)
  const parsed = RegisterSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos inválidos o intento de escalada de privilegios',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { email, password, role } = parsed.data

  const supabaseAdmin = await serverSupabaseServiceRole(event)
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role } // El trigger de Postgres sincroniza public.profiles
  })

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return {
    success: true,
    message: 'Usuario creado exitosamente',
    userId: data.user.id,
    assignedRole: role
  }
})
