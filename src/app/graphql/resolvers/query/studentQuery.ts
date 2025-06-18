import { GraphQLContext } from "@/app/lib/context"

export const studentQuery = {
    Query: {
        getStudents: async (_:unknown, __: unknown, context: GraphQLContext) => {
            if(context.tokenExpired) {
                return {
                    success: false,
                    message: "Session Expired",
                    data: null
                }
            };

            if(!context.userId) {
                return {
                    success: false,
                    message: "Unauthorized No user",
                    data: null
                }
            }

            if(context.role !== "ADMIN"){
                return {
                    success: false,
                    message: "Unauthorized",
                    data: null
                }
            }

            const user = await context.prisma.student.findMany({include: {User: true}});
            return {
                success: true,
                message: "Success",
                data: user
            }
        }
    }
}
