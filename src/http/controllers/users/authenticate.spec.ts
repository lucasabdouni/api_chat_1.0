import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      },
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
  })
})
