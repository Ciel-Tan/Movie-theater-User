import { getAllSeatTypes } from "@/services/seatTypeService";
import { ISeatType } from "@/types/seat";
import { useEffect, useState } from "react";

export const useGetSeatType = () => {
    const [seatTypesData, setSeatTypesData] = useState<ISeatType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getSeatTypes = async () => {
        setLoading(true);
        try {
            const seatTypes = await getAllSeatTypes();
            setSeatTypesData(seatTypes);
        }
        catch (error) {
            console.error("Error get all seatTypes: ", error);
            setError("Failed to get all seatTypes");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSeatTypes();
    }, []);

    return { seatTypesData, loading, error };
}