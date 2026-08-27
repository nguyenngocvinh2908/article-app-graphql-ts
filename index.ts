import express, { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import * as database from './config/database'
import { typeDefs } from './typeDefs/index'
import { resolvers } from './resolvers/index'
import { requireAuth } from './middlewares/auth'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

let apolloServer: ApolloServer | null = null

const initApp = async () => {
  // 1. Kết nối DB
  await database.connectDatabase()

  // 2. Auth middleware
  app.use('/graphql', requireAuth)

  // 3. Khởi tạo Apollo Server
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      context: ({ req }) => ({ ...req })
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app as any, path: '/graphql' })
  }

  // 4. CHỈ chạy app.listen khi test dưới máy LOCAL
  if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  }
}

// Chạy hàm khởi tạo
initApp()

export default app