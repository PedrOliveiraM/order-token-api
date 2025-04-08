import { z } from "zod";

const envSchema  = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default("1h"),
})

export const env = envSchema.parse(process.env)