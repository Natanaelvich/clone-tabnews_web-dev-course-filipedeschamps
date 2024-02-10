import { z } from 'zod'

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)
