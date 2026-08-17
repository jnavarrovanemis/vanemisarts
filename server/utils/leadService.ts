// server/utils/leadService.ts
//
// Cliente de Supabase creado a mano, solo en servidor.
//
// Antes esto usaba `serverSupabaseServiceRole` de `@nuxtjs/supabase`. Ese
// modulo, ademas del helper de servidor, registra un plugin de cliente que
// arrastraba supabase-js entero (auth, realtime, storage) al bundle del
// navegador, para una landing que no lee ni escribe en la base de datos desde
// el cliente. Creando el cliente aqui, el import solo existe en el grafo de
// servidor y desaparece del navegador.
//
// Las variables se leen de `process.env` en tiempo de peticion, no en build,
// para que la clave secreta no acabe horneada en ningun artefacto.

import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { z } from 'zod'
import type { Database } from '../../app/types/database.types'
import type { ContactSchema } from './validations'

type ContactData = z.infer<typeof ContactSchema>

let client: SupabaseClient<Database> | null = null

function getServiceClient() {
  if (client) return client

  const url = process.env.SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_KEY

  if (!url || !secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuración de Supabase incompleta en el servidor'
    })
  }

  client = createClient<Database>(url, secretKey, {
    auth: {
      // Cliente de servidor de vida corta: no hay sesion que persistir ni token
      // que refrescar. Desactivarlo evita temporizadores colgando en serverless.
      persistSession: false,
      autoRefreshToken: false
    }
  })

  return client
}

export const createLeadInDB = async (leadData: ContactData) => {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('leads')
    .insert([{
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || null,
      project_stage: leadData.projectStage,
      website_instagram: leadData.website || null,
      service_interest: leadData.interest,
      project_description: leadData.project || null,
      internal_status: 'new'
    }])
    .select()
    .single()

  if (error) {
    console.error('Error en createLeadInDB:', error.message)
    throw new Error('No se pudo guardar el prospecto en la base de datos')
  }

  return data
}
