// server/utils/resend.ts
export const sendWithResend = async (
  data: Record<string, unknown>,
  subject: string,
  replyTo?: string
) => {
  const { resendApiKey, contactEmail, resendFromEmail } = useRuntimeConfig()
  const recipients = String(contactEmail || '')
    .split(',')
    .map(email => email.trim())
    .filter(Boolean)

  if (!resendApiKey || !recipients.length || !resendFromEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuración de Resend incompleta en el servidor: faltan destinatario, API key o remitente verificado'
    })
  }

  // Estilizamos cada línea de los datos para que se vea elegante
  const htmlBody = Object.entries(data)
    .map(
      ([key, value]) => `
        <li style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong style="color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${key.replace(/_/g, ' ')}:
          </strong> 
          <br/>
          <span style="color: #4b5563; font-size: 16px;">
            ${String(value)}
          </span>
        </li>
      `
    )
    .join('')

  const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
            <tr>
              <td align="center">
                <div style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  
                  <div style="background-color: #111827; padding: 30px 20px; text-align: center;">
                    <img src="/header-email.svg" alt="Vanemis Arts Logo" style="height: 40px; width: auto; display: block; margin: 0 auto;" />
                  </div>
  
                  <div style="padding: 40px 30px;">
                    <h2 style="color: #ec4899; margin-top: 0; margin-bottom: 24px; font-size: 24px; text-align: center;">
                      ¡Nuevo Lead Recibido! 🚀
                    </h2>
                    <p style="color: #6b7280; font-size: 16px; margin-bottom: 30px; text-align: center;">
                      Alguien ha completado el formulario de contacto en tu sitio web. Aquí tienes los detalles:
                    </p>
                    
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                      ${htmlBody}
                    </ul>
                  </div>
  
                  <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      Este mensaje fue generado automáticamente desde tu plataforma de Nuxt.<br/>
                      © ${new Date().getFullYear()} Vanemis Arts
                    </p>
                  </div>
  
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

  try {
    const response = await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        from: resendFromEmail,
        to: recipients,
        // Al responder la notificacion, el correo llega directamente al lead.
        reply_to: replyTo,
        subject,
        html: emailTemplate // Aquí inyectamos todo el diseño
      }
    })

    return response
  } catch (error: unknown) {
    const err = error as { data?: { message?: string } | string, message?: string }
    const errorDetails = err?.data || err?.message || String(error)
    const providerMessage = typeof err?.data === 'object'
      ? err.data?.message
      : typeof err?.data === 'string'
        ? err.data
        : err?.message

    console.error('💥 Error de Resend:', errorDetails)

    throw createError({
      statusCode: 500,
      statusMessage: providerMessage
        ? `Resend: ${providerMessage}`
        : 'Error al enviar el correo con Resend',
      data: errorDetails
    })
  }
}
