import User from '../models/user'
import md5 from 'md5'
import { generateRandomString } from '../helpers/generate'

interface UserInput {
  fullName?: string,
  password: string,
  email: string,
  token?: string
}

interface UserAgrs {
  user: UserInput
}

export const resolversUser = {
  Mutation: {
    registerUser: async (_: unknown, args: UserAgrs) => {
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
    },
    loginUser: async (_: unknown, args: UserAgrs) => {
      const { user } = args
      const infoUser = await User.findOne({ email: user.email, deleted: false })
      if(!infoUser) {
        return {
          code: 400,
          message: "Email is not exist"
        }
      }
      if(infoUser.password !== md5(user.password)) {
        return {
          code:  400,
          message: "Password is not correct"
        }
      }
      return {
        code: 200,
        message: "Success",
        id: infoUser._id,
        token: infoUser.token,
        fullName: infoUser.fullName
      }
    }
  },
  Query: {
    getUser: async (_: unknown, args: unknown,  context: UserAgrs) => {
      const infoUser = await User.findOne({ token: context.user.token, deleted: false })
      if(!infoUser) {
        return {
          code: 400,
          message: "Unsuccess"
        }
      } else {
        return {
          code: 200,
          message: "Success",
          fullName: infoUser.fullName,
          email: infoUser.email,
          id: infoUser._id,
          token: infoUser.token
        }
      }
    }
  }
}