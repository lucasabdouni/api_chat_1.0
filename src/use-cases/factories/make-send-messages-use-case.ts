import { PrismaMessagesRepository } from '@/repositories/prisma/prisma-messages-repository'
import { SendMessageUseCase } from '../send-message'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeSendMessagesUseCase() {
  const messagesRepository = new PrismaMessagesRepository()
  const usersRepository = new PrismaUsersRepository()
  const sendMessagesUseCase = new SendMessageUseCase(
    usersRepository,
    messagesRepository,
  )

  return sendMessagesUseCase
}
