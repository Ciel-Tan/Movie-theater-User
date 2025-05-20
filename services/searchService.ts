import { AI_api } from "@/utils/axios";

export const search = async (query: string) => {
    try {
        const { data: response } = await AI_api.get(`/search?query=${query}`);
        return response;
    }
    catch (error) {
        console.error("Error in search service:", error);
        return error;
    }
};