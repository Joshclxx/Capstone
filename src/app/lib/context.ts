import {PrismaClient} from "@prisma/client"
import { prisma } from "./prisma"
import { NextRequest } from "next/server";
import { verifyAccessToken } from "../services/jwtUtils";
import { AuthService } from "../services/authService";
import { cookies } from "next/headers";


export interface JwtPayload {
    userId: string;
    role: "ADMIN" | "TEACHER" | "STUDENT"
}

export type GraphQLContext = {
    prisma: PrismaClient,
    // attributes?: Record<string, string> //ABAC 
    role?: JwtPayload["role"];
    userId?: string;
    authService: AuthService;
    refreshToken: string | undefined;
    tokenExpired: boolean;
}

const authService = new AuthService(prisma)

export async function createContext(req: NextRequest): Promise<GraphQLContext> {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    const authHeader = req.headers.get("authorization");
    console.log("Auth Header:", authHeader);
    const token = authHeader?.split(" ")[1];
    console.log("Token extracted:", token);

    if(!token){
        console.log("No token provided");
        return {prisma, authService, refreshToken, tokenExpired: false}
    }

    try {   
        const decoded = verifyAccessToken(token)
        console.log("Token Decoded:", decoded);
        return {
            prisma,
            userId: decoded.userId,
            role: decoded.role,
            authService,
            refreshToken,
            tokenExpired: false
        }

    } catch (err) {
        if(err instanceof Error && err.name === "TokenExpiredError"){
            return {prisma, authService, refreshToken, tokenExpired: true}
        }

        console.error("JWT Verification failed", err);
        return {prisma, authService, refreshToken, tokenExpired: false}
    }
}