import { getBookingByAccountId } from "@/services/bookingService";
import { IBooking } from "@/types/booking";
import { useEffect, useState } from "react";

export const useGetBooking = (account_id: number | null) => {
    const [bookingData, setBookingData] = useState<IBooking[]>([]);
    const [bookingLoading, setBookingLoading] = useState<boolean>(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    const getBooking = async () => {
        if (account_id === null) return

        setBookingLoading(true);
        try {
            const booking = await getBookingByAccountId(account_id);
            setBookingData(booking);
        }
        catch (error) {
            console.error(`Error get booking by account id ${account_id}: `, error);
            setBookingError(`Failed to get booking by account id ${account_id}`);
        }
        finally {
            setBookingLoading(false);
        }
    };

    useEffect(() => {
        getBooking();
    }, [account_id]);

    return { bookingData, bookingLoading, bookingError };
}