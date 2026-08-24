import Article from "./models/article"
import Category from "./models/category"
interface ByIdArgs {
  id: string
}
interface ArticleInput {
  title: string
  avatar?: string
  description?: string
}
interface CategoryInput {
  title: string,
  avatar?: string
}

interface CreateCategoryArgs {
  category: CategoryInput
}
interface CreateArticleArgs {
  article: ArticleInput
}

type UpdateArticleArgs = ByIdArgs & CreateArticleArgs
type UpdateCategoryArgs = ByIdArgs & CreateCategoryArgs


export const resolvers = { 
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({ deleted: false })
      return articles
    },
    getArticle: async (_: unknown, args: ByIdArgs) => {
      const { id } = args
      const article = await Article.findOne({ _id: id, deleted: false })
      return article
    },
    getListCategory: async () => {
      const categories = await Category.find({ deleted: false })
      return categories
    },
    getCategory: async (_: unknown, args: ByIdArgs) => {
      const { id } = args
      const category = await Category.findOne({ _id: id, deleted: false })
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
    },
    createCategory: async (_: unknown, args: CreateCategoryArgs) => {
      const { category } = args
      const record = new Category(category)
      await record.save()
      return record
    },
    updateCategory: async (_: unknown, args: UpdateCategoryArgs) => {
      const { id, category } = args
      const updateCategory = await Category.findByIdAndUpdate( id, { $set: category }, { new: true })
      return updateCategory
    },
    deleteCategory: async (_: unknown, args: ByIdArgs) => {
      const { id } = args
      await Category.updateOne({ _id: id }, { deleted: true, deletedAt: Date.now() })
      return "Success"
    }
  }
}