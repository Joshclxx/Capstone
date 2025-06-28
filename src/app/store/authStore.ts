"use client"

import { JwtPayload } from "../lib/context";
import {create} from "zustand"

interface AuthState {
    isAuthenticated: boolean;
    role: JwtPayload["role"] | null;
    setIsAuthenticated: (value: boolean) => void;
    setRole: (role: JwtPayload["role"] | null | undefined) => void;
    resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    role: null,

    setIsAuthenticated: (value: boolean) => set({isAuthenticated: value}),
    setRole: (role) => set({role}),
    resetAuth: () => set({isAuthenticated: false, role: null})
}))