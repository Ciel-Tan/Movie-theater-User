import { api } from "@/utils/axios";

export const getAllTickets = async () => {
    try {
        const { data: tickets } = await api.get("/api/tickets/getAll");
        return tickets;
    }
    catch (error) {
        console.error("Error in getAllTickets service:", error);
        return error;
    }
};