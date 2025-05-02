import { api } from "@/utils/axios";

export const getAllGenres = async () => {
    try {
        const { data: genres } = await api.get("/api/public/genres/getAll");
        return genres;
    }
    catch (error) {
        console.error("Error in getAllGenres service:", error);
        return error;
    }
};