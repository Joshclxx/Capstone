import {PrismaClient} from "@prisma/client"
import { prisma } from "./prisma"
import { NextRequest } from "next/server";
import  { TokenExpiredError } from "jsonwebtoken"
import { verifyAccessToken } from "../services/jwtUtils";
import { AuthService } from "../services/authService";


export interface JwtPayload {
    userId: string;
    role: "ADMIN" | "REGISTRAR" | "TEACHER" | "STUDENT"
}

export type GraphQLContext = {
    prisma: PrismaClient,
    // attributes?: Record<string, string> //ABAC 
    role?: JwtPayload["role"];
    userId?: string;
    authService: AuthService;
    tokenExpired?: boolean;
}

const authService = new AuthService(prisma)

export async function createContext(req: NextRequest): Promise<GraphQLContext> {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if(!token){
        console.log("No token provided");
        return {prisma, authService}
    }

    try {
        const decoded = await verifyAccessToken(token)
        console.log("Token Decoded:", decoded);
        return {
            prisma,
            userId: decoded.userId,
            role: decoded.role,
            authService,
        }

    } catch (err) {
        if(err instanceof TokenExpiredError){
            return {prisma, authService, tokenExpired: true}
        }
        console.error("JWT Verification failed", err);
        return {prisma, authService}
    }
}