import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryMessagesRepository } from '@/repositories/in-memory/in-memory-messages-repository'
import { SendMessageUseCase } from './send-message'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UserNotExists } from './errors/user-not-exists'

let messagesRepository: InMemoryMessagesRepository
let usersRepository: InMemoryUsersRepository
let sut: SendMessageUseCase

describe('Send Message Use Case', () => {
  beforeEach(() => {
    messagesRepository = new InMemoryMessagesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new SendMessageUseCase(usersRepository, messagesRepository)
  })

  it('should be able send to messages', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { message } = await sut.execute({
      text: 'Hello John Doe',
      userId,
    })

    expect(message.id).toEqual(expect.any(String))
  })

  it('should not be able to send a register with an invalid user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        text: 'Hello John Doe',
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(UserNotExists)
  })
})
