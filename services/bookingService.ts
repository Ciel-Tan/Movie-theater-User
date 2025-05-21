import { IBooking } from "@/types/booking";
import { api } from "@/utils/axios";

export const getBookingByBookingId = async (booking_id: number) => {
    try {
        const { data: booking } = await api.get(`/api/bookings/${booking_id}`);
        return booking;
    }
    catch (error) {
        console.error("Error in getBookingByBookingId service:", error);
        return error;
    }
};

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

export const createBooking = async (data: IBooking) => {
    try {
        const { data: booking } = await api.post("/api/bookings/create", data);
        return booking
    }
    catch (error) {
        console.error("Error in createBooking service:", error);
    }
};

export const removeBooking = async (id: number) => {
    try {
        const { data: booking } = await api.delete(`/api/bookings/${id}`);
        return booking
    }
    catch (error) {
        console.error("Error in removeBooking service:", error);
    }
};