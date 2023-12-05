import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    const { refreshToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String),
      }),
    )
  })
})
