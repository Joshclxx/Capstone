import { loginMutation } from "./mutation/loginMutation"
import { refreshTokenMutation } from "./mutation/refreshToken"
import { usersQuery } from "./query/usersQuery"

export const resolvers = {
    Query: {
        ...usersQuery.Query
    },
    Mutation: {
        ...loginMutation.Mutation,
        ...refreshTokenMutation.Mutation
    }
}