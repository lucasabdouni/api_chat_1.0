import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { MessagesRepository } from '../messages-repository'

export class PrismaMessagesRepository implements MessagesRepository {
  async create(data: Prisma.MessageUncheckedCreateInput) {
    const message = await prisma.message.create({
      data,
    })

    return message
  }

  async listMessages() {
    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return messages
  }
}
