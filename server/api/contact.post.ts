// server/api/contact.post.ts
import { z } from 'zod'

// 1. Actualizamos el esquema para que coincida con el frontend
const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto').max(100).trim(),
  email: z.string().email('Email inválido').max(200).trim().toLowerCase(),
  phone: z.string().max(50).trim().optional(),
  projectStage: z.string().min(1, 'La etapa es requerida').max(50).trim(),
  website: z.string().max(200).trim().optional(),
  interest: z.string().min(1, 'El interés es requerido').max(100).trim(),
  project: z.string().max(3000).trim().optional()
})

export default defineEventHandler(async (event) => {
  const { contactEmail } = useRuntimeConfig()

  if (!contactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuración de servidor incompleta (contactEmail faltante)'
    })
  }

  const raw = await readBody(event)
  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos del formulario inválidos',
      // Formateamos los errores para que el frontend los pueda leer fácilmente
      data: parsed.error.flatten().fieldErrors
    })
  }

  // 2. Extraemos todos los campos validados
  const { name, email, phone, projectStage, website, interest, project } = parsed.data

  const origin = getHeader(event, 'origin') || 'http://localhost:3000'

  // Opcional: Diccionario para traducir el valor de projectStage en el correo
  const stageMap: Record<string, string> = {
    idea: 'Tengo una idea',
    starting: 'Empezando',
    established: 'Negocio establecido'
  }

  try {
    await $fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': `${origin}/`
      },
      body: {
        Nombre: name,
        Email: email,
        Teléfono: phone || 'No especificado',
        Sitio_Web: website || 'No especificado',
        Etapa_Del_Proyecto: stageMap[projectStage] || projectStage,
        Servicio_De_Interés: interest,
        Detalles_Del_Proyecto: project || 'No especificado',
        // Configuraciones de FormSubmit
        _subject: `🚀 Nuevo Lead: ${name} - ${interest}`,
        _template: 'table',
        _captcha: 'false'
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error enviando a FormSubmit:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Error al procesar el envío del formulario con el proveedor externo.'
    })
  }
})
