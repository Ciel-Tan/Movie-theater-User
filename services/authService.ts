'use client'

import { ILogin, IRegister } from "@/types/auth";
import { api } from "@/utils/axios";

export const login = async ({ email, password }: ILogin) => {
    try {
        const { data: authResponse } = await api.post("/api/auth/login", { email, password });
        return authResponse;
    }
    catch (error) {
        console.error("Error in login service:", error);
        throw error
    }
}

export const register = async (data: IRegister) => {
    try {
        const { data: authResponse } = await api.post("/api/auth/register", data);
        return authResponse;
    }
    catch (error) {
        console.error("Error in register service:", error);
        throw error
    }
}