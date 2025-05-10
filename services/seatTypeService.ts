import { api } from "@/utils/axios";

export const getAllSeatTypes = async () => {
    try {
        const { data: seats } = await api.get("/api/seat_types/getAll");
        return seats;
    }
    catch (error) {
        console.error("Error in getAllSeatTypes service:", error);
        return error;
    }
};