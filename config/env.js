import { config } from 'dotenv'

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

export const {
  DB_URI,
  EMAIL_PASSWORD,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  PORT,
  NODE_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  SERVER_URL
} = process.env
