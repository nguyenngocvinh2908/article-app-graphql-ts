import Article from "./models/article"

export const resolvers = { Query: {
  hello: () => {
    return "Hello World"
  },
  getListArticle: async () => {
    const article = await Article.find({ deleted: false })
    return article
  }
}}