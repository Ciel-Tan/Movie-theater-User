import { createBooking, removeBooking } from "@/services/bookingService";
import { IBooking } from "@/types/booking";
import { useState } from "react";

export const useActionBooking = () => {
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    const createBookingMovie = async (data: IBooking) => {
        setBookingLoading(true);
        try {
            const response = await createBooking(data);
            if (response.message) setBookingError(response.message);
            return response
        }
        catch (error) {
            console.error("Error in createBooking service:", error);
            setBookingError("Failed to create booking");
        }
        finally {
            setBookingLoading(false);
        }
    };

    const cancelBookingMovie = async (id: number) => {
        setBookingLoading(true);
        try {
            const response = await removeBooking(id);
            return response
        }
        catch (error) {
            console.error("Error in removeBooking service:", error);
            setBookingError("Failed to cancel booking");
        }
        finally {
            setBookingLoading(false);
        }
    };

    return { createBookingMovie, cancelBookingMovie, bookingLoading, bookingError };
}