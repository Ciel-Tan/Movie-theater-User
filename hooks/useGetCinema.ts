import { getAllCinemas } from "@/services/cinemaService";
import { ICinema } from "@/types/cinema";
import { useEffect, useState } from "react";

export const useGetCinema = () => {
    const [cinemasData, setCinemasData] = useState<ICinema[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getCinemas = async () => {
        setLoading(true);
        try {
            const genres = await getAllCinemas();
            setCinemasData(genres);
        }
        catch (error) {
            console.error("Error get all genres: ", error);
            setError("Failed to get all genres");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCinemas();
    }, []);

    return { cinemasData, loading, error };
}