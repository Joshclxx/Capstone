import { GraphQLContext } from "@/app/lib/context";
import { GraphQLError } from "graphql";
import { cookies } from "next/headers";


export const loginMutation = {
    Mutation: {
        login: async (_: unknown, args: {data: {email: string, password: string}}, context: GraphQLContext) => {

            const attemptLogin = async () => {
                const {email, password} = args.data;

                const result = await context.authService.login(email, password);

                if(result.success && result.refreshToken){
                    (await cookies()).set("refreshToken", result.refreshToken, {
                    httpOnly: true, //anti XSS
                    sameSite: "strict", //anti CSRF
                    secure: true, //https
                    maxAge: 60 * 60 * 24 * 7, //7days :>
                    path: "/api/refresh-token",
                    });
                }

                return {
                    success: result.success,
                    message: result.message,
                    token: result.accessToken
                }
            }

            try {
                return await attemptLogin();
            } catch (err: unknown) {
                if (err instanceof Error && err.message.toLowerCase().includes("connection")) {
                    try {
                        await context.prisma.$connect();
                        console.log("Database reconnected successfully, retrying login...");
                        return await attemptLogin(); // retry after successful reconnection
                    } catch (reconnectErr) {
                        console.error("Database reconnection failed:", reconnectErr);
                        throw new GraphQLError("Database connection lost. Please try again later.", {
                            extensions: { code: "DATABASE_CONNECTION_ERROR" },
                        });
                    }
                }

                console.error("Login mutation error:", err);
                throw new GraphQLError("An unexpected error occurred during login.", {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            }
        },
    }
}