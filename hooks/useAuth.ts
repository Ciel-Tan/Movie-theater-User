import { login, register } from "@/services/authService";
import { ILogin, IRegister } from "@/types/auth";
import axios from "axios";
import { useState } from "react";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const Login = async ({ email, password }: ILogin) => {
        setLoading(true);
        try {
            const authResponse = await login({ email, password });
            return authResponse;
        }
        catch (err: any) {
            console.error("Error in login hook:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
            }
            else {
                setError(err.message || "An unexpected error occurred.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    const Register = async (data: IRegister) => {
        setLoading(true);
        try {
            const authResponse = await register(data);
            return authResponse;
        }
        catch (err: any) {
            console.error("Error in register hook:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
            }
            else {
                setError(err.message || "An unexpected error occurred.");
            }
        }
        finally {  
            setLoading(false);
        }
    }

    return { Login, Register, loading, error };
}