import Category from "../models/category"

interface ByIdArgs {
  id: string
}

interface CategoryInput {
  title: string,
  avatar?: string
}

interface CreateCategoryArgs {
  category: CategoryInput
}

type UpdateCategoryArgs = ByIdArgs & CreateCategoryArgs


export const resolversCategory = { 
  Query: {
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