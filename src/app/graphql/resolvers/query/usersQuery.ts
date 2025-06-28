import { GraphQLContext } from "@/app/lib/context"
import { GraphQLError } from "graphql"

export const usersQuery = {
    Query: {
        getAllUsers: async (_:unknown, __: unknown, context: GraphQLContext) => {
            if(context.tokenExpired) {
                throw new GraphQLError("Token expired", {
                    extensions: {
                        code: "TOKEN_EXPIRED"
                    }
                })
            };

            if(!context.userId) {
                throw new GraphQLError("test", {
                    extensions: {
                        code: "UNAUTHENTICATED"
                    }
                })
            }

            if(context.role !== "STUDENT"){
                throw new GraphQLError("Unauthorized", {
                    extensions: {
                        code: "UNAUTHORIZED"
                    }
                })
            }

            const users = await context.prisma.user.findMany();
            return {
                success: true,
                message: "Success",
                data: users
            }
        }
    }
}
