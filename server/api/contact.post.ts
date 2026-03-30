// server/api/contact.post.ts
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  interest: z.string().max(100).optional(),
  message: z.string().min(10).max(2000).trim()
})

export default defineEventHandler(async (event) => {
  const { contactEmail } = useRuntimeConfig()

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
      statusMessage: 'Datos del formulario inválidos',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { name, email, interest, message } = parsed.data

  // FormSubmit requiere Origin y Referer del navegador para aceptar peticiones
  // de servidor a servidor — los reenviamos desde los headers de la petición original
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
    throw createError({
      statusCode: 502,
      statusMessage: 'Error al procesar el envío del formulario con el proveedor externo.'
    })
  }
})
