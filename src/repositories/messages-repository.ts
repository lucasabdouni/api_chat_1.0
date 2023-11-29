import { Prisma, Message } from '@prisma/client'

export interface MessagesRepository {
  create(data: Prisma.MessageUncheckedCreateInput): Promise<Message>
  listMessages(): Promise<Message[]>
}
