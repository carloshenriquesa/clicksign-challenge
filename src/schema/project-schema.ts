import { z } from 'zod'

export const projectSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .refine((value) => value.trim().split(/\s+/).length > 1, {
        message: 'Por favor, digite ao menos duas palavras',
      }),
    client: z.string().min(3, 'Por favor, digite ao menos uma palavra'),
    startDate: z.coerce.date({ invalid_type_error: 'Selecione uma data válida' }),
    endDate: z.coerce.date({ invalid_type_error: 'Selecione uma data válida' }),
    banner: z.string().optional(),
    isFavorite: z.boolean().optional(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Data de início deve ser menor que a data final',
    path: ['endDate'],
  })

export type Project = z.infer<typeof projectSchema>
