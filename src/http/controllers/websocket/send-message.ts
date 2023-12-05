import { prisma } from '@/lib/prisma'
import { makeSendMessagesUseCase } from '@/use-cases/factories/make-send-messages-use-case'
import { FastifyInstance, FastifyRequest } from 'fastify'

export async function messageRoutesWebSocket(app: FastifyInstance) {
  interface RouteGenericInterface {
    Querystring: {
      username: string
    }
  }

  const getUserById = async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })

      return user
    } catch (error) {
      console.error('Erro ao buscar usuário no Prisma:', error)
      return null
    }
  }

  app.addHook(
    'preValidation',
    async (request: FastifyRequest<RouteGenericInterface>, reply) => {
      if (request.routerPath === '/chat' && !request.query.username) {
        reply.code(403).send('Connection rejected')
        return
      }

      const userId = String(request.query.username)

      if (userId) {
        const user = await getUserById(userId)

        if (!user) {
          reply.code(403).send('User not found')
        }
      }
    },
  )

  app.get(
    '/chat',
    { websocket: true },
    (connection, request: FastifyRequest) => {
      const { username } = request.query
      console.log('Usario:', username)

      const sendMessageUseCase = makeSendMessagesUseCase()

      broadcast({
        sender: '__server',
        type: 'joined',
        message: `${username}`,
      })

      connection.socket.on('message', async (message) => {
        try {
          message = JSON.parse(message.toString())

          const { message: text } = message

          const sendMessage = await sendMessageUseCase.execute({
            text,
            userId: username,
          })

          broadcast({
            type: 'submit',
            ...sendMessage,
          })
        } catch {
          throw new Error()
        }
      })

      connection.socket.on('close', () => {
        broadcast({
          sender: '__server',
          message: `${username} left`,
        })
      })

      connection.socket.on('error', (error) => {
        console.error('Erro na conexão WebSocket:', error)
      })
    },
  )

  function broadcast(message) {
    for (const client of app.websocketServer.clients) {
      client.send(JSON.stringify(message))
    }
  }
}
