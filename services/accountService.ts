import { api } from "@/utils/axios";

export const getAccountById = async (account_id: number) => {
    try {
        const { data: account } = await api.get(`/api/accounts/${account_id}`);
        return account;
    }
    catch (error) {
        console.error("Error in getAccountById service:", error);
        return error;
    }
};