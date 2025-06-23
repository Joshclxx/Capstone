import { GraphQLContext } from "@/app/lib/context";
import jwt from "jsonwebtoken"

export const loginMutation = {
    Mutation: {
        login: async (_: unknown, args: {data: {email: string, password: string}}, context: GraphQLContext) => {
            const {email, password} = args.data;

            const user = await context.prisma.user.findUnique({where: {email}, include: {Student: true}})
            if(!user || user.password !== password){
                return {
                    success: false,
                    message: "Incorrect username or password",
                    token: null,
                }
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    role: "STUDENT",
                    studentId: user.Student?.id.toString()
                },
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: "7d",
                }
            );

            return {
                success: true,
                message: "Successfully created token",
                token, 
            }
        },
    }
}