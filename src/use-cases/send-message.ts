import { MessagesRepository } from './../repositories/messages-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotExists } from './errors/user-not-exists'

interface SendMessageUseCaseRequest {
  text: string
  userId: string
}

interface MessageProps {
  id: string
  text: string
  created_at: Date
  user_id: string
  user: {
    name: string
  }
}

interface SendMessageUseCaseResponse {
  message: MessageProps
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

    const { name } = checkUserExists

    const messageCreate = await this.messagesRepository.create({
      text,
      user_id: userId,
    })

    const message: MessageProps = {
      id: messageCreate.id,
      text: messageCreate.text,
      user_id: messageCreate.user_id,
      created_at: messageCreate.created_at,
      user: {
        name,
      },
    }

    return { message }
  }
}
