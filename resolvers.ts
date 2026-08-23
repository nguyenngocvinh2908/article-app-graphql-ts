import Article from "./models/article"
interface GetArticlesArgs {
  id: string,
}
interface ArticleInput {
  title: string;
  avatar?: string;
  description?: string;
}
interface CreateArticleArgs {
  article: ArticleInput;
}

interface UpdateArticleArgs {
  id: string,
  article: ArticleInput 
}

interface DeleteArticleArgs {
  id: string
}

export const resolvers = { 
  Query: {

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
  },
  Mutation: {
    createArticle: async (_: unknown, args: CreateArticleArgs) => {
      const { article } = args
      const record = new Article(article)
      await record.save()
      return record
    },
    updateArticle: async (_: unknown, args: UpdateArticleArgs) => {
      const { id, article } = args
      const updatedArticle = await Article.findByIdAndUpdate( id,{ $set: article },{ new: true } );
      return updatedArticle
    },
    deleteArticle: async (_: unknown , args: DeleteArticleArgs) => {
      const { id } = args
      await Article.updateOne({ _id: id}, { deleted: true, deletedAt: Date.now() })
      return "Success"
    }
  }
}