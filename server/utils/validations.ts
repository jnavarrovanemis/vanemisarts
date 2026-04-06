import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto').max(100).trim(),
  email: z.string().email('Email inválido').max(200).trim().toLowerCase(),
  phone: z.string().max(50).trim().optional(),
  projectStage: z.enum(['idea', 'in_development', 'launched', 'scaling'], {
    message: 'Etapa del proyecto no válida o requerida'
  }),
  website: z.string().max(200).trim().optional(),
  interest: z.string().min(1, 'El interés es requerido').max(100).trim(),
  project: z.string().max(3000).trim().optional()
})
