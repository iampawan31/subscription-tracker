import { Router } from 'express'
import {
  createSubscription,
  getUserSubscription
} from '../controllers/subscription.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) =>
  res.send({ title: 'GET all subscriptions' })
)

subscriptionRouter.get('/:id', (req, res) =>
  res.send({ title: 'GET subscription' })
)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/', (req, res) =>
  res.send({ title: 'UPDATE subscription' })
)

subscriptionRouter.delete('/:id', (req, res) =>
  res.send({ title: 'DELETE subscription' })
)

subscriptionRouter.get('/user/:id', authorize, getUserSubscription)

subscriptionRouter.put('/:id/cancel', (req, res) =>
  res.send({ title: 'CANCEL all user subscriptions' })
)

subscriptionRouter.get('/upcoming-renewals', (req, res) =>
  res.send({ title: 'GET upcoming renewals' })
)

export default subscriptionRouter
