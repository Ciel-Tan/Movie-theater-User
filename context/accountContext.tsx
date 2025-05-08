'use client'

import { decodeToken } from "@/utils/decodeToken";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const accountContext = createContext<number | null>(null);

export function useAccountContext() {
    return useContext(accountContext);
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
    const [account_id, setAccountId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAccountId = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const { account_id } = await decodeToken(token);
                    setAccountId(account_id);
                }
                catch (error) {
                    console.error("Token decoding failed:", error);
                    setAccountId(0);
                }
            }
        };
        fetchAccountId();
    }, []);

    return (
        <accountContext.Provider value={account_id}>
            {children}
        </accountContext.Provider>
    );
}