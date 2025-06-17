import {mergeTypeDefs} from '@graphql-tools/merge'
import { userTypeDefs } from './userSchema'
import { teacherTypeDefs } from './teacherSchema'

export const typeDefs = mergeTypeDefs([
    userTypeDefs,
    teacherTypeDefs,
])

