import Article from "../models/article"
import Category from "../models/category"

interface ByIdArgs {
  id: string
}
interface ArticleInput {
  title: string,
  avatar?: string,
  description?: string,
  categoryId?: string
}

interface CreateArticleArgs {
  article: ArticleInput
}

type UpdateArticleArgs = ByIdArgs & CreateArticleArgs


export const resolversArticle = { 
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({ deleted: false })
      return articles
    },
    getArticle: async (_: unknown, args: ByIdArgs) => {
      const { id } = args
      const article = await Article.findOne({ _id: id, deleted: false })
      return article
    }
  },
  Article: {
    category: async (article: ArticleInput) => {
      const categoryId = article.categoryId
      const category = await Category.findOne({ _id: categoryId, deleted: false })
      return category
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
      const updatedArticle = await Article.findByIdAndUpdate( id,{ $set: article },{ new: true } )
      return updatedArticle
    },
    deleteArticle: async (_: unknown , args: ByIdArgs) => {
      const { id } = args
      await Article.updateOne({ _id: id}, { deleted: true, deletedAt: Date.now() })
      return "Success"
    }
  }
}