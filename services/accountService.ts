import { IAccount } from "@/types/account";
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

export const updateAccount = async (account_id: number, account: IAccount) => {
    try {
        const { data: updatedAccount } = await api.put(`/api/accounts/${account_id}`, account);
        return updatedAccount;
    }
    catch (error) {
        console.error("Error in updateAccount service:", error);
        return error;
    }
}