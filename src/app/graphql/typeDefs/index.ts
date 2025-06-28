import {mergeTypeDefs} from '@graphql-tools/merge'
import { userTypeDefs } from './userSchema'
import { teacherTypeDefs } from './teacherSchema'
import { loginTypeDefs } from './loginSchema'
import { studentTypeDefs } from './studentSchema'
import { refreshTokenDefs } from './refreshTokenSchema'

export const typeDefs = mergeTypeDefs([
    loginTypeDefs,
    refreshTokenDefs,
    userTypeDefs,
    teacherTypeDefs,
    studentTypeDefs
])

