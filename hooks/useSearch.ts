import { search } from "@/services/searchService";
import { ISearch } from "@/types/search";
import { useState } from "react";

export const useSearch = () => {
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const searchContent = async (query: string) => {
        setSearchLoading(true);
        try {
            const data = await search(query);
            return data as ISearch[];
        }
        catch (error) {
            console.error("Error search: ", error);
            setSearchError("Failed to search");
        }
        finally {
            setSearchLoading(false);
        }
    };

    return { searchContent, searchLoading, searchError };
}