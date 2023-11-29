import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { send } from './send'
import { list } from './list'

export async function messageRoutes(app: FastifyInstance) {
  /** Authenticated **/
  app.post('/message/send', { onRequest: [verifyJwt] }, send)
  app.get('/messages', { onRequest: [verifyJwt] }, list)
}
