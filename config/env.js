import { config } from 'dotenv'

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

export const { DB_URI, JWT_SECRET, JWT_EXPIRES_IN, PORT, NODE_ENV } =
  process.env
