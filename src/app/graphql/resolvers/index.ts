import { loginMutation } from "./mutation/loginMutation"
import { studentQuery } from "./query/studentQuery"

export const resolvers = {
    Query: {
        ...studentQuery.Query
    },
    Mutation: {
        ...loginMutation.Mutation
    }
}