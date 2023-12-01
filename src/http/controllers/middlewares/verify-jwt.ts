import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err: any) {
    if (err.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
      return reply
        .status(401)
        .send({ message: 'Unauthorized', code: 'token.expired' })
    } else {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
