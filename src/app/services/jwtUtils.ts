import { JwtPayload } from "../lib/context";
import jwt from "jsonwebtoken"

type JwtPayloadWithClaims = JwtPayload & {
    exp?: number;
    iat?: number;
    nbf?: number;
};

const accessToken = process.env.ACCESS_TOKEN_SECRET!
const refreshToken = process.env.REFRESH_TOKEN_SECRET!

export function createAccessToken (payload: JwtPayload){
    return jwt.sign(payload, accessToken, {expiresIn: "15min"});
}

export function createRefreshToken (payload: JwtPayload){
    return jwt.sign(payload, refreshToken, {expiresIn: "7d"});
}

export function stripTokenClaims(payload: JwtPayloadWithClaims): JwtPayload {
    const cleanPayload = {
        userId: payload.userId,
        role: payload.role
    };
    return cleanPayload
}

export function verifyAccessToken (token: string) {
    try {
        return jwt.verify(token, accessToken) as JwtPayload;
    } catch (err) {
        console.error("JWT Verification error:", err);
        throw err; 
    }
}

export function verifyRefreshToken (token: string) {
    try {
        return jwt.verify(token, refreshToken) as JwtPayload;
    } catch (err) {
        console.error("JWT Verification error:", err);
        throw err; 
    }
}

export function decodeToken (token: string) {
    const decodedToken = jwt.decode(token) as JwtPayload | null;
    if(!decodedToken){
        console.error("JWT Decoding returned null. Possibly malformed token.");
    }
    return decodedToken;
}