import {mergeTypeDefs} from '@graphql-tools/merge'
import { userTypeDefs } from './userSchema'
import { teacherTypeDefs } from './teacherSchema'
import { loginTypeDefs } from './loginSchema'
import { studentTypeDefs } from './studentSchema'
export const typeDefs = mergeTypeDefs([
    loginTypeDefs,
    userTypeDefs,
    teacherTypeDefs,
    studentTypeDefs
])

