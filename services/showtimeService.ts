import { api } from "@/utils/axios";

export const getShowtimeById = async (showtime_id: number) => {
    try {
        const { data: showtime } = await api.get(`/api/showtimes/${showtime_id}`);
        return showtime;
    }
    catch (error) {
        console.error("Error in getAllShowtimeById service:", error);
        return error;
    }
};