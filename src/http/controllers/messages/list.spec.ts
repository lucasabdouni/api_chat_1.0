import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('List Messages (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list messages', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    await prisma.message.create({
      data: {
        text: 'Hello World',
        user_id: user.id,
      },
    })

    const listMessages = await request(app.server)
      .get('/messages')
      .set('Authorization', `Bearer ${token}`)

    console.log(listMessages.body)

    expect(listMessages.statusCode).toEqual(200)
  })
})
