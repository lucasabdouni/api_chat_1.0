import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMessagesListUseCase } from '@/use-cases/factories/make-get-messages-list-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const listMessages = makeGetMessagesListUseCase()

  const messages = await listMessages.execute()

  console.log(messages)

  return reply.status(200).send({
    messages,
  })
}
