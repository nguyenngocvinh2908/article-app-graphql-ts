import express, { Express } from 'express'
import { ApolloServer } from "apollo-server-express"
import dotenv from 'dotenv'
import * as database from './config/database'
import { typeDefs } from './typedefs'
import { resolvers } from './resolvers'

const startServer = async () => {
  // Env
  dotenv.config()

  // Connect Database
  await database.connectDatabase()

  const app: Express = express()
  const port: number | string = process.env.PORT || 3000;

  // GraphSql
  const apolloServer = new ApolloServer({ typeDefs, resolvers})

  await apolloServer.start()

  apolloServer.applyMiddleware({ app: app as any , path: '/graphql' })

  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

startServer()