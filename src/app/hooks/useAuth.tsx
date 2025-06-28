import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
// import { useRouter } from "next/router"; // comment ko muna habang wala pang logout 
import { setAccessToken } from "../lib/token";
import { decodeToken } from "../services/jwtUtils";
import { GraphQLError } from "graphql";

interface refreshToken {
    refreshToken: {
        accessToken: string
    }
}

interface GraphQLResponse  {
    data?: refreshToken,
    errors: GraphQLError[]
}

export function useAuth () {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const role = useAuthStore((state) => state.role);
    const setRole = useAuthStore((state) => state.setRole);
    const resetAuth = useAuthStore((state) => state.resetAuth);
    const [loading, setLoading] = useState(true);
    // const router = useRouter();

    useEffect(() => {
        const silentFart = async () => { //HAHAHAHAHAHAHAHAHA 
            try {
                const res = await fetch("/api/graphql", {
                    method: "POST",
                    credentials: "include",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        query: `mutation { refreshToken {accessToken } }`,
                    }),
                });

                const json: GraphQLResponse = await res.json();
                if(json.errors?.some(err => err.extensions?.code === "REFRESH_TOKEN_EXPIRED")) {
                    console.log("Refresh token expired. Forcing logout bitch!");
                    setAccessToken("");
                    resetAuth();
                    return
                } 

                const token = json?.data?.refreshToken?.accessToken;
                if(token){
                    const payload = decodeToken(token);
                    setRole(payload?.role)
                    setAccessToken(token);
                    setIsAuthenticated(true)
                } else {
                    setAccessToken("");
                    resetAuth()
                }
            } catch (err) {
                console.error("Silent Refresh failed", err); //ito muna habang wala pang toast
                setAccessToken("");
                resetAuth();
            } finally {
                setLoading(false)
            }

        };

        silentFart()
    
    }, [setIsAuthenticated, setRole, resetAuth]);

    return {isAuthenticated, role, loading}
}