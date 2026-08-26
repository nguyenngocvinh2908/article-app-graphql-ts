import User from '../models/user'
import md5 from 'md5'
import { generateRandomString } from '../helpers/generate'

interface UserArgs {
  fullName: string,
  password: string,
  email: string,
  token?: string
}

interface RegisterArgs {
  user: UserArgs
}

export const resolversUser = {
  Mutation: {
    registerUser: async (_: unknown, args: RegisterArgs) => {
      const { user } = args
      const emailExist = await User.findOne({ email: user.email, deleted: false })
      if(emailExist) {
        return {
          code: 400,
          message: "Email is exist"
        }
      } else {
        const newUser = new User({
          ...user,
          password: md5(user.password),
          token: generateRandomString(30)
        })
        const data = await newUser.save()
        return {
          code: 200,
          massage: "Success",
          id: data._id,
          fullName: data.fullName,
          email: data.email,
          token: data.token
        }
      }
    }
  }
}