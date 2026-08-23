import Article from "./models/article"
interface GetArticlesArgs {
  id: string
}

export const resolvers = { Query: {

  hello: () => {
    return "Hello World"
  },
  getListArticle: async () => {
    const article = await Article.find({ deleted: false })
    return article
  },
  getArticle: async (_: unknown, args: GetArticlesArgs) => {
    const { id } = args
    const article = await Article.findOne({ _id: id, deleted: false })
    return article
  }
}}