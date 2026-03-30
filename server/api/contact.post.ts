// server/api/contact.post.ts
import { promises as dns } from 'node:dns'
import { z } from 'zod'

// Esquema de validación con Zod
const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  interest: z.string().max(100).optional(),
  message: z.string().min(10).max(2000).trim()
})

/**
 * Verifica si un dominio tiene registros MX (Mail Exchange) configurados.
 */
async function hasValidMxRecords(email: string): Promise<boolean> {
  const domain = email.split('@')[1]
  try {
    const addresses = await dns.resolveMx(domain)
    return addresses && addresses.length > 0
  } catch {
    return false
  }
}

/**
 * Lista negra simple de proveedores de correos temporales o desechables.
 */
const DISPOSABLE_DOMAINS = [
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'yopmail.com',
  'guerrillamail.com'
]

export default defineEventHandler(async (event) => {
  const { contactEmail } = useRuntimeConfig()

  // 1. Verificar configuración del servidor
  if (!contactEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuración de servidor incompleta (Falta email de destino)'
    })
  }

  // 2. Leer y validar el cuerpo de la petición con Zod
  const raw = await readBody(event)
  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos del formulario inválidos',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { name, email, interest, message } = parsed.data
  const domain = email.split('@')[1]

  // 3. Validación: ¿Es un correo temporal?
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Por favor, utiliza una dirección de correo permanente.'
    })
  }

  // 4. Validación: ¿El dominio existe y puede recibir correos (DNS MX)?
  const hasMx = await hasValidMxRecords(email)
  if (!hasMx) {
    throw createError({
      statusCode: 422,
      statusMessage: 'El dominio de tu correo no es válido o no puede recibir mensajes.'
    })
  }

  // 5. Preparar envío a FormSubmit
  const origin = getHeader(event, 'origin') || 'http://localhost:3000'

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
        nombre: name,
        email: email,
        servicio: interest ?? 'No especificado',
        mensaje: message,
        _subject: `🚀 Nuevo Lead: ${name}`,
        _template: 'table',
        _captcha: 'false'
      }
    })

    return { success: true }
  } catch (error) {
    console.error('FormSubmit Error:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Error al procesar el envío con el proveedor externo.'
    })
  }
})
