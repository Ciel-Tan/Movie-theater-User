import { getBookingByAccountId, getBookingByMovieId } from "@/services/bookingService";
import { IBooking } from "@/types/booking";
import { useEffect, useState } from "react";

export const useGetBooking = (criteria: string | null, id: number | null) => {
    const [bookingData, setBookingData] = useState<IBooking[]>([]);
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    const getBookingAccount = async () => {
        if (id === null) return

        setBookingLoading(true);
        try {
            const booking = await getBookingByAccountId(id);
            setBookingData(booking);
        }
        catch (error) {
            console.error(`Error get booking by account id ${id}: `, error);
            setBookingError(`Failed to get booking by account id ${id}`);
        }
        finally {
            setBookingLoading(false);
        }
    };

    const getBookingMovie = async () => {
        if (id === null) return

        setBookingLoading(true);
        try {
            const booking = await getBookingByMovieId(id);
            setBookingData(booking);
        }
        catch (error) {
            console.error(`Error get booking by movie id ${id}: `, error);
            setBookingError(`Failed to get booking by movie id ${id}`);
        }
        finally {
            setBookingLoading(false);
        }
    };

    useEffect(() => {
        if (criteria === null || id === null) return
        
        if (criteria === "account_id") getBookingAccount();
        else if (criteria === "movie_id") getBookingMovie();
    }, [criteria, id]);

    return { bookingData, bookingLoading, bookingError };
}