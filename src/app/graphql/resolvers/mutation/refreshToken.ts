import { GraphQLContext } from "@/app/lib/context";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "@/app/services/jwtUtils";
import { GraphQLError } from "graphql";
import { cookies } from "next/headers";


export const refreshTokenMutation = {
    Mutation: {
        refreshToken: async (_: unknown, __: unknown, context: GraphQLContext) => {
            if(!context.refreshToken) throw new GraphQLError("No refresh token found.", {
                extensions: {
                    code: "REFRESH_TOKEN_EXPIRED"
                }
            });

            const payload = verifyRefreshToken(context.refreshToken);
            const accessToken = createAccessToken(payload);
            const newRefreshToken = createRefreshToken(payload);

            (await cookies()).set("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/api/graphql",
                maxAge: 60 * 60 * 24 * 7
            });

            return {accessToken}
        } 
    }
}