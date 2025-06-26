import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"

const accessToken = process.env.ACCESS_TOKEN_SECRET!
const refreshToken = process.env.REFRESH_TOKEN_SECRET!

export function createAccessToken (payload: JwtPayload){
    return jwt.sign(payload, accessToken, {expiresIn: "15min"});
}

export function createRefreshToken (payload: JwtPayload){
    return jwt.sign(payload, refreshToken, {expiresIn: "7d"});
}

export function verifyAccessToken (token: string) {
    return jwt.verify(token, accessToken) as JwtPayload;
}

export function verifyRefreshToken (token: string) {
    return jwt.verify(token, refreshToken) as JwtPayload;
}