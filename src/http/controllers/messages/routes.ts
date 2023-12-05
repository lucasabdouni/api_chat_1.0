import { FastifyInstance, FastifyRequest } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { send } from './send'
import { list } from './list'
import { prisma } from '@/lib/prisma'

export async function messageRoutes(app: FastifyInstance) {
  /** Authenticated **/
  app.post('/message/send', { onRequest: [verifyJwt] }, send)
  app.get('/messages', { onRequest: [verifyJwt] }, list)
}
