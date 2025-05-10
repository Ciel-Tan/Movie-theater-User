import { getAllSeats } from "@/services/seatService";
import { ISeat } from "@/types/seat";
import { useEffect, useState } from "react";

export const useGetSeat = () => {
    const [seatsData, setSeatsData] = useState<ISeat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getSeats = async () => {
        setLoading(true);
        try {
            const seats = await getAllSeats();
            setSeatsData(seats);
        }
        catch (error) {
            console.error("Error get all seats: ", error);
            setError("Failed to get all seats");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSeats();
    }, []);

    return { seatsData, loading, error };
}