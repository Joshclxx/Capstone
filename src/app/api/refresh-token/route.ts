import { createAccessToken, createRefreshToken, stripTokenClaims, verifyRefreshToken } from "@/app/services/jwtUtils";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(){
    try {
        const refreshToken = (await cookies()).get("refreshToken")?.value;
        if(!refreshToken){
            return NextResponse.json({error: "No refresh token provided"}, {status: 401});
        }

        const cleanPayload = stripTokenClaims(verifyRefreshToken(refreshToken))
        const newAccessToken = createAccessToken(cleanPayload);
        const newRefreshToken = createRefreshToken(cleanPayload);

        (await cookies()).set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/api/refresh-token",
            maxAge: 60 * 60 * 27 * 7
        })

        return NextResponse.json({accessToken: newAccessToken});

    } catch (err) {
        console.error(`ERORRRR${err}`)
        return NextResponse.json({error: "Invalid refresh token"}, {status: 401})
    }

}