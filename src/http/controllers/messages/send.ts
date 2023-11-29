import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSendMessagesUseCase } from '@/use-cases/factories/make-send-messages-use-case'
import { UserNotExists } from '@/use-cases/errors/user-not-exists'

export async function send(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const registerBodySchema = z.object({
    text: z.string(),
  })

  const { text } = registerBodySchema.parse(request.body)

  try {
    const sendMessageUseCase = makeSendMessagesUseCase()

    await sendMessageUseCase.execute({
      text,
      userId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof UserNotExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
