import { GraphQLContext } from "@/app/lib/context";
// import { GraphQLError } from "graphql";


export const loginMutation = {
    Mutation: {
        login: async (_: unknown, args: {data: {email: string, password: string}}, context: GraphQLContext) => {
            const {email, password} = args.data;

            const result = await context.authService.login(email, password);

            if(result.success && result.refreshToken){
                context.res.cookies.set("refreshToken", result.refreshToken, {
                    httpOnly: true, //anti XSS (Cross-Site Scripting)
                    secure: true, //https :>
                    sameSite: 'strict', //anti CSRF deymm
                    path: "/api/graphql",
                    maxAge: 60 * 60 * 24 * 7
                });
            }

            return {
                success: result.success,
                messsage: result.message,
                token: result.accessToken
            }
        },
    }
}