import { getShowtimeById } from "@/services/showtimeService";
import { IMovieDetailWithShowtime } from "@/types/movie";
import { useEffect, useState } from "react";

export const useGetShowtime = (showtime_id: number) => {
    const [showtimeData, setShowtimeData] = useState<IMovieDetailWithShowtime>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getShowtimeDetail = async () => {
        setLoading(true);
        try {
            const showtime = await getShowtimeById(showtime_id);
            setShowtimeData(showtime);
        }
        catch (error) {
            console.error("Error get showtime by id: ", error);
            setError("Failed to get showtime by id");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getShowtimeDetail();
    }, [showtime_id]);

    return { showtimeData, loading, error };
}