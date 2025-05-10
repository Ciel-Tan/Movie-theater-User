import { api } from "@/utils/axios";

export const getBookingByAccountId = async (account_id: number) => {
    try {
        const { data: booking } = await api.get(`/api/bookings/getByAccountId/${account_id}`);
        return booking;
    }
    catch (error) {
        console.error("Error in getBookingByAccountId service:", error);
        return error;
    }
};

export const getBookingByMovieId = async (movie_id: number) => {
    try {
        const { data: booking } = await api.get(`/api/bookings/getByMovieId/${movie_id}`);
        return booking;
    }
    catch (error) {
        console.error("Error in getBookingByMovieId service:", error);
        return error;
    }
};