export const PERMISSIONS = {
  USERS_CREATE: 'users.create',
  USERS_DELETE: 'users.delete',
  LEADS_MANAGE: 'leads.manage',
  CONTENT_APPROVE: 'content.approve',
  BILLING_VIEW: 'billing.view'
} as const

// Tipo derivado automáticamente que usaremos en las funciones
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]
