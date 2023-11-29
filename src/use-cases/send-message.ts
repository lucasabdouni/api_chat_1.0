import { MessagesRepository } from './../repositories/messages-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Message } from '@prisma/client'
import { UserNotExists } from './errors/user-not-exists'

interface SendMessageUseCaseRequest {
  text: string
  userId: string
}

interface SendMessageUseCaseResponse {
  message: Message
}

export class SendMessageUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private messagesRepository: MessagesRepository,
  ) {}

  async execute({
    text,
    userId,
  }: SendMessageUseCaseRequest): Promise<SendMessageUseCaseResponse> {
    const checkUserExists = await this.usersRepository.findById(userId)

    if (!checkUserExists) {
      throw new UserNotExists()
    }

    const message = await this.messagesRepository.create({
      text,
      user_id: userId,
    })

    return { message }
  }
}
