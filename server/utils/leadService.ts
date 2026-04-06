// server/utils/leadService.ts
import { serverSupabaseServiceRole } from '#supabase/server'
import type { H3Event } from 'h3'
import type { z } from 'zod'
import type { ContactSchema } from './validations'

type ContactData = z.infer<typeof ContactSchema>

export const createLeadInDB = async (event: H3Event, leadData: ContactData) => {
  const supabase = await serverSupabaseServiceRole(event)

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
