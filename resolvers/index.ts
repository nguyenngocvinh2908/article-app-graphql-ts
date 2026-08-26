import { resolversArticle } from "./article"
import { resolversCategory } from "./category"
import { resolversUser } from './user'

export const resolvers = [
  resolversArticle,
  resolversCategory,
  resolversUser
]