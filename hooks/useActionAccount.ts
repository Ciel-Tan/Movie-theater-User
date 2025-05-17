import { updateAccount } from "@/services/accountService";
import { IAccount } from "@/types/account";
import { useState } from "react";

export const useActionAccount = () => {
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const updateAccountInfo = async (account_id: number, account: IAccount) => {
        setActionLoading(true);
        try {
            await updateAccount(account_id, account);
            setActionSuccess("Your profile has been updated successfully.");
        }
        catch (error) {
            console.error(`Error get account by id ${account_id}: `, error);
            setActionError(`Failed to get account by ${account_id}`);
        }
        finally {
            setActionLoading(false);
        }
    };

    return { updateAccountInfo, actionLoading, actionSuccess, actionError };
}