import { getAllTickets } from "@/services/ticketService";
import { ITicket } from "@/types/booking";
import { useEffect, useState } from "react";

export const useGetTicket = () => {
    const [ticketsData, setTicketsData] = useState<ITicket[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getTickets = async () => {
        setLoading(true);
        try {
            const tickets = await getAllTickets();
            setTicketsData(tickets);
        }
        catch (error) {
            console.error("Error get all tickets: ", error);
            setError("Failed to get all tickets");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTickets();
    }, []);

    return { ticketsData, loading, error };
}