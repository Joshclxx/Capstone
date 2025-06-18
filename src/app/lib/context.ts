import {PrismaClient} from "@prisma/client"
import { prisma } from "./prisma"
import { NextRequest } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken"


interface JwtPayload {
    userId: string;
    role: "ADMIN" | "REGISTRAR" | "TEACHER" | "STUDENT"
    // attributes?: Record<string, string> //ABAC 
    studentId?: number;
    teacherId?: number;
    registrarId?: number;
    adminId?: string;
}

export type GraphQLContext = {
    prisma: PrismaClient,
    // attributes?: Record<string, string> //ABAC 
    role?: JwtPayload["role"];
    userId?: string;
    studentId?: number;
    teacherId?: number;
    registrarId?: number;
    adminId?: string;
    tokenExpired?: boolean;
}

export async function createContext(req: NextRequest): Promise<GraphQLContext> {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if(!token){
        console.log("No token provided");
        return {prisma}
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        console.log("Token Decoded:", decoded);
        return {
            prisma,
            userId: decoded.userId,
            role: decoded.role,
            adminId: decoded.adminId,
            teacherId: decoded.teacherId,
            studentId: decoded.studentId,
        }

    } catch (err) {
        if(err instanceof TokenExpiredError){
            return {prisma, tokenExpired: true}
        }
        console.error("JWT Verification failed", err);
        return {prisma}
    }
}