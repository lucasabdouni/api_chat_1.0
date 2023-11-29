import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { send } from './send'
import { list } from './list'

export async function userRoutes(app: FastifyInstance) {
  /** Authenticated **/
  app.get('/message/send', { onRequest: [verifyJwt] }, send)
  app.get('/messages', { onRequest: [verifyJwt] }, list)
}
