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

interface ListArticelAgrs {
  sortKey?: string,
  sortValue?: 1 | -1 | "asc" | "desc",
  currentPage?: number,
  limitItem?: number,
  filterValue?: string,
  filterKey?: string
  keyword?: string
}


type UpdateArticleArgs = ByIdArgs & CreateArticleArgs


export const resolversArticle = { 
  Query: {
    getListArticle: async (_: unknown, agrs: ListArticelAgrs) => {
      let find: Record<string, unknown> = { deleted: false }
      // Sort
      const { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword } = agrs
      let sort: Record<string, 1 | -1 | "asc" | "desc"> = {}
      if(sortKey && sortValue) sort[sortKey] = sortValue
      // Pavigation
      const page = currentPage ?? 1
      const limit = limitItem ?? 5
      const skip = (page - 1) * limit
      // Filter
      if(filterKey && filterValue) find[filterKey] = filterValue
      // Search
      if(keyword) {
        const keywordRegex = new RegExp(keyword, 'i')
        find["title"] = keywordRegex
      }
      const articles = await Article.find(find).sort(sort).limit(limit).skip(skip)
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