import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
// import { useRouter } from "next/router"; // comment ko muna habang wala pang logout 
import { setAccessToken } from "../lib/token";
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
    // const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const silentFart = async () => {
            try {
                const accessToken = await refreshAccessToken();

                if (accessToken) {
                    const payload = decodeToken(accessToken);
                    setRole(payload?.role);
                    setAccessToken(accessToken);
                    setIsAuthenticated(true);
                } else {
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
                    console.log("Im here")
                    return;
                }

                console.error("Silent Refresh failed", err);
                setAccessToken("");
                resetAuth();
            } finally {
                setLoading(false);
            }
        };

        silentFart();
    }, [setIsAuthenticated, setRole, resetAuth]);

    return {isAuthenticated, role, loading}
}