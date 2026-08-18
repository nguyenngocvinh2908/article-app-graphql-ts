import express, { Express, Request, Response } from 'express'
// Env
import dotenv from 'dotenv'
dotenv.config()

// Connect Database
import * as database from './config/database'
import Article from './models/article'
database.connectDatabase()

const app: Express = express()
const port: number | string = process.env.PORT || 3000;

// Rest API
app.get('/articles', async (req: Request, res: Response) => {
  const articles = await Article.find({ deleted: false })
  res.json({
    articles: articles
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})