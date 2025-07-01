"use client"

import { useAuth } from "../hooks/useAuth";

export function AuthProvider ({
    children, 
} : {
    children : React.ReactNode
}) {
    const {loading} = useAuth();

    if (loading )    {
        return <div>loading...</div> //palitan ng loading animation kung kaya
    }

    return <>{children}</>
}