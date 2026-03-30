import { promises as dns } from 'node:dns'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  interest: z.string().max(100).optional(),
  message: z.string().min(10).max(2000).trim()
})

async function hasValidMxRecords(email: string): Promise<boolean> {
  const domain = email.split('@')[1]
  if (!domain) return false // Seguridad extra para TS

  try {
    const addresses = await dns.resolveMx(domain)
    return addresses && addresses.length > 0
  } catch {
    return false
  }
}

const DISPOSABLE_DOMAINS = ['mailinator.com', '10minutemail.com', 'temp-mail.org']

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // Forzamos a TS a tratarlo como string para el fetch posterior
  const contactEmail = config.contactEmail as string

  if (!contactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuración de servidor incompleta'
    })
  }

  const raw = await readBody(event)
  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos inválidos',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { name, email, interest, message } = parsed.data
  const domain = email.split('@')[1] ?? '' // Evita que domain sea undefined

  if (DISPOSABLE_DOMAINS.includes(domain)) {
    throw createError({ statusCode: 422, statusMessage: 'Correo temporal no permitido' })
  }

  const hasMx = await hasValidMxRecords(email)
  if (!hasMx) {
    throw createError({ statusCode: 422, statusMessage: 'Dominio de correo inválido' })
  }

  const origin = getHeader(event, 'origin') || 'http://localhost:3000'

  try {
    // Aquí es donde contactEmail daba error de 'undefined'
    await $fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': `${origin}/`
      },
      body: {
        nombre: name,
        email,
        servicio: interest ?? 'No especificado',
        mensaje: message,
        _subject: `🚀 Nuevo Lead: ${name}`,
        _template: 'table',
        _captcha: 'false'
      }
    })

    return { success: true }
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Error con el proveedor externo' })
  }
})
