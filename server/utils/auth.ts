import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'
import type { Permission } from '#shared/utils/permissions'

export const getAuthorizedProfile = async (event: H3Event, requiredPermission: Permission) => {
  const user = await serverSupabaseUser(event)
  if (!user) return null

  const supabase = await serverSupabaseServiceRole(event)

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      role,
      user_permissions!profile_id (permission)
    `)
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error verificando permisos:', error?.message)
    }
    return null
  }

  // Admin = Superusuario, acceso total sin verificar permisos
  if (profile.role === 'admin') {
    return { id: user.id, role: profile.role }
  }

  // Supabase retorna [] cuando no hay permisos — includes lo maneja
  const permissions = profile.user_permissions.map((p: { permission: string }) => p.permission)

  if (!permissions.includes(requiredPermission)) return null

  return { id: user.id, role: profile.role }
}
