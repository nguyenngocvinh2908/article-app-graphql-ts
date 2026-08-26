import { gql } from "apollo-server-express"

export const typeDefsUser = gql`
  type User {
    id: ID,
    fullName: String,
    email: String,
    token: String,
    code: Int,
    message: String
  }

  input RegisterInput {
    fullName: String,
    email: String,
    password: String
  }

  input LoginInput {
    email: String,
    password: String
  }

  type Mutation {
    registerUser(user: RegisterInput): User
    loginUser(user: LoginInput): User
  }
`