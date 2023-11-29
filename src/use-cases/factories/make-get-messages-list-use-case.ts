import { PrismaMessagesRepository } from '@/repositories/prisma/prisma-messages-repository'
import { GetMessageUseCase } from '../get-messages'

export function makeGetMessagesListUseCase() {
  const messagesRepository = new PrismaMessagesRepository()
  const getMessagesUseCase = new GetMessageUseCase(messagesRepository)

  return getMessagesUseCase
}
