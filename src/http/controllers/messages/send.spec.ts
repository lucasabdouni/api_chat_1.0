import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Send Messages (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list messages', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/message/send')
      .send({
        text: 'By John Doe',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
