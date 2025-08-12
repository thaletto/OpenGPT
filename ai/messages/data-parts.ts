import z from 'zod/v3'

export const dataPartSchema = z.object({
  // All sandbox-related data parts have been removed
})

export type DataPart = z.infer<typeof dataPartSchema>
