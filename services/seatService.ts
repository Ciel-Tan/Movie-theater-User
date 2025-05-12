import { api } from "@/utils/axios";

export const getAllSeats = async () => {
    try {
        const { data: seats } = await api.get("/api/public/seats/getAll");
        return seats;
    }
    catch (error) {
        console.error("Error in getAllSeats service:", error);
        return error;
    }
};