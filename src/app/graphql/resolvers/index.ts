import { loginMutation } from "./mutation/loginMutation"
import { usersQuery } from "./query/usersQuery"

export const resolvers = {
    Query: {
        ...usersQuery.Query
    },
    Mutation: {
        ...loginMutation.Mutation,
    }
}