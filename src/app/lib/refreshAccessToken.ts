export async function refreshAccessToken() {
    try {
        const res = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include",
        });

        const json = await res.json();

        if (!res.ok) {
            const errorMsg = json.error || "Failed to refresh access token";
            throw new Error(errorMsg);
        }

        return json.accessToken as string;
    } catch (err) {
        throw err;
    }
}
