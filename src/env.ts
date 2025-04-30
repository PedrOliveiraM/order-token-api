import { config } from 'dotenv';
import { z } from "zod";

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const envSchema  = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default("1h"),
})

export const env = envSchema.parse(process.env)