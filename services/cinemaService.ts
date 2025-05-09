import { api } from "@/utils/axios";

export const getAllCinemas = async () => {
    try {
        const { data: cinemas } = await api.get("/api/public/cinemas/getAll");
        return cinemas;
    }
    catch (error) {
        console.error("Error in getAllCinemas service:", error);
        return error;
    }
};