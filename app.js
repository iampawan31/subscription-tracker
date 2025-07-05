import cookieParser from 'cookie-parser'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import userRouter from './routes/user.routes.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Welcome to Subscription Tracker API!!')
})

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API running on http://localhost:${PORT}`)

  await connectToDatabase()
})

export default app
