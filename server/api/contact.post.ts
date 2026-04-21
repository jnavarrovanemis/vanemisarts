export default defineEventHandler(async (event) => {
  // 1. Recibir datos
  const raw = await readBody(event)

  // 2. Validar (usando el utilitario)
  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Datos del formulario inválidos',
      data: parsed.error.flatten().fieldErrors
    })
  }

  // 3. Guardar en Base de Datos
  try {
    const newLead = await createLeadInDB(event, parsed.data)

    // 4. Mapeo para el correo (Traducimos el ENUM a texto legible para ti)
    const stageMap: Record<string, string> = {
      idea: 'Tengo una idea',
      in_development: 'En desarrollo',
      launched: 'Lanzado / Empezando',
      scaling: 'Escalando / Establecido'
    }

    // 5. Enviar Correo con Resend
    await sendWithResend({
      Nombre: parsed.data.name,
      Email_del_Cliente: parsed.data.email,
      Teléfono: parsed.data.phone || 'No especificado',
      Sitio_Web: parsed.data.website || 'No especificado',
      Etapa_Del_Proyecto: stageMap[parsed.data.projectStage] || parsed.data.projectStage,
      Servicio_De_Interés: parsed.data.interest,
      Detalles_Del_Proyecto: parsed.data.project || 'No especificado'
    }, `🚀 Nuevo Lead: ${parsed.data.name} - ${parsed.data.interest}`)

    // 6. Retornar éxito
    return {
      success: true,
      message: 'Mensaje enviado y guardado correctamente',
      leadId: newLead.id
    }
  } catch (error: unknown) {
    // Verificamos de forma segura si el error tiene la propiedad 'message'
    const errorMessage = error instanceof Error
      ? error.message
      : 'Error interno del servidor'

    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})
