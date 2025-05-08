import { getAccountById } from "@/services/accountService";
import { useEffect, useState } from "react";

export const useGetAccount = (account_id: number | null) => {
    const [accountData, setAccountData] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getAccount = async () => {
        if (account_id === null) return

        setLoading(true);
        try {
            const account = await getAccountById(account_id);
            setAccountData(account);
        }
        catch (error) {
            console.error(`Error get account by id ${account_id}: `, error);
            setError(`Failed to get account by ${account_id}`);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAccount();
    }, [account_id]);

    return { accountData, loading, error };
}