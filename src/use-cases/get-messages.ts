import { MessagesRepository } from './../repositories/messages-repository'
import { Message } from '@prisma/client'

interface SendMessageUseCaseResponse {
  messages: Message[]
}

export class GetMessageUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(): Promise<SendMessageUseCaseResponse> {
    const messages = await this.messagesRepository.listMessages()

    return { messages }
  }
}
