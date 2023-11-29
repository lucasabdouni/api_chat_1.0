import { Prisma, Message } from '@prisma/client'
import { MessagesRepository } from '../messages-repository'

export class InMemoryMessagesRepository implements MessagesRepository {
  public items: Message[] = []

  async create(data: Prisma.MessageUncheckedCreateInput) {
    const message = {
      id: 'message-1',
      text: data.text,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(message)

    return message
  }

  async listMessages() {
    const messages = this.items

    return messages
  }
}
