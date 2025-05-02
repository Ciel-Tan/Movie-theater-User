import { api } from "@/utils/axios";

export const getAllMovies = async () => {
    try {
        const { data: movies } = await api.get("/api/public/movies/getAll");
        return movies;
    } catch (error) {
        console.error("Error in getAllMovies service:", error);
    }
};

export const getMovieById = async (id: number) => {
    try {
        const { data: movie } = await api.get(`/api/public/movies/${id}`);
        return movie;
    } catch (error) {
        console.error("Error in getMovieById service:", error);
    }
};

export const getMovieNowShowing = async () => {
    try {
        const { data: movie } = await api.get("/api/public/movies/now-showing");
        return movie;
    }
    catch (error) {
        console.error("Error in getMovieNowShowing service:", error);
    }
};

export const getMovieComingSoon = async () => {
    try {
        const { data: movie } = await api.get("/api/public/movies/coming-soon");
        return movie;
    }
    catch (error) {
        console.error("Error in getMovieComingSoon service:", error);
    }
}