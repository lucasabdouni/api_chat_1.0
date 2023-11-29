import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryMessagesRepository } from '@/repositories/in-memory/in-memory-messages-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetMessageUseCase } from './get-messages'

let messagesRepository: InMemoryMessagesRepository
let usersRepository: InMemoryUsersRepository
let sut: GetMessageUseCase

describe('Get Messages Use Case', () => {
  beforeEach(() => {
    messagesRepository = new InMemoryMessagesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetMessageUseCase(messagesRepository)
  })

  it('should be able to register', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await messagesRepository.create({
      text: 'Hello John Doe',
      user_id: userId,
    })

    const { messages } = await sut.execute()

    expect(messages[0].text).toEqual('Hello John Doe')
  })
})
