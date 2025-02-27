import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  GOOGLE_CLIENT_ID: z.string().default(''),
  GOOGLE_CLIENT_SECRET: z.string().default(''),
  WEB_URL: z.string().url().default('http://localhost:3000'),
  POSTGRES_URL: z
    .string()
    .url()
    .default('postgres://docker:docker@localhost:5432/postgres'),
  CALLBACKURL: z.string().default('http://localhost:3000/api/auth/google/callback'),
})

export const env = envSchema.parse(process.env)