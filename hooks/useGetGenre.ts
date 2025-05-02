import { getAllGenres } from "@/services/genreService";
import { useEffect, useState } from "react";

export const useGetGenre = () => {
    const [genresData, setGenresData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getGenres = async () => {
        setLoading(true);
        try {
            const genres = await getAllGenres();
            setGenresData(genres);
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
        getGenres();
    }, []);

    return { genresData, loading, error };
}