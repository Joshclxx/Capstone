import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { createAccessToken, createRefreshToken } from "./jwtUtils";


export class AuthService {
    constructor(private prisma: PrismaClient) {}

    async login (email: string, password: string) {
        const user = await this.prisma.user.findUnique({where: {email}});
        if(!user || !await bcrypt.compare(password, user.password)) {
            return {
                success: false,
                message: "Incorrect email or password",
                accessToken: null,
                refreshToken: null,
            }
        };

        const payload = {
            userId: user.id,
            role: user.role
        }
        const refreshToken = createRefreshToken(payload)
        const accessToken = createAccessToken(payload);
    
        return {
            success: true,
            message: "Successfully logged in.",
            accessToken,
            refreshToken,
        }

    }
}