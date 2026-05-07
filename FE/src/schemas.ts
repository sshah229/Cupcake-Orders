import { z } from 'zod'

export const customerSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  firstName: z.string(),
  lastName: z.string(),
  numChocolate: z.number().int().nonnegative(),
  numVanilla: z.number().int().nonnegative(),
  numStrawberry: z.number().int().nonnegative(),
})

export type Customer = z.infer<typeof customerSchema>
