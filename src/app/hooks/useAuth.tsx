
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation"; 
import { getAccessToken, setAccessToken } from "../lib/token";
import { decodeToken } from "../services/jwtUtils";
import { refreshAccessToken } from "../lib/refreshAccessToken";
import { usePathname } from "next/navigation";

export function useAuth () {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const role = useAuthStore((state) => state.role);
    const setRole = useAuthStore((state) => state.setRole);
    const resetAuth = useAuthStore((state) => state.resetAuth);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const silentFart = async () => {
            try {

                let accessToken = getAccessToken();

                if(!accessToken) {
                    accessToken = await refreshAccessToken();
                    setAccessToken(accessToken);
                }   

                if (accessToken) {
                    const payload = decodeToken(accessToken);
                    setRole(payload?.role);
                    setIsAuthenticated(true);
                } else {
                    //playsafe :D
                    setAccessToken("");
                    resetAuth();
                }

            } catch (err) {
                if (
                    err instanceof Error &&
                    err.message === "No refresh token provided" &&
                    pathname === "/login"
                ) {
                    setAccessToken("");
                    resetAuth();
                    console.log("TESTING ")
                    return;
                }

                // router.replace("/login")
                setAccessToken("");
                resetAuth();
            } finally {
                setLoading(false);
            }
        };

        silentFart();
    }, [setIsAuthenticated, setRole, resetAuth, pathname, router]);

    return {isAuthenticated, role, loading}
}