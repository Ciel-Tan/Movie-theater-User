import { Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useGetGenre } from "@/hooks/useGetGenre";
import { IGenre, IMovieDetail } from "@/types/movie";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { ISearch } from "@/types/search";
interface IGridHeaderProps {
    type: string;
    moviesData: IMovieDetail[] | null;
    setFilteredMovies: (movies: IMovieDetail[]) => void;
    setSearchData?: (search: ISearch[]) => void;
    searchType?: string;
    setSearchLoading?: (loading: boolean) => void;
    query?: string;
}

const GridHeader = ({ type, moviesData, setFilteredMovies, setSearchData, searchType, setSearchLoading, query }: IGridHeaderProps) => {
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [selectedSortBy, setSelectedSortBy] = useState("title asc");
    const hasRun = useRef(false)

    const { searchContent } = useSearch()
    const { genresData } = useGetGenre()

    const sortByData = [
        { value: "title asc", label: "Title (A-Z)" },
        { value: "title desc", label: "Title (Z-A)" },
        ...(type !== "Coming soon" ? [
            { value: "run_time asc", label: "Runtime (Short-Long)" },
            { value: "run_time desc", label: "Runtime (Long-Short)" }
        ] : []),
        { value: "release_date asc", label: "Release (Old-New)" },
        { value: "release_date desc", label: "Release (New-Old)" },
    ];

    const handleSearch = async () => {
        setSearchLoading!(true)
        const response = await searchContent(query!);
        const filteredResponse = response?.filter((item: ISearch) => item.similarity_score < 0.6);
        setSearchData!(filteredResponse!);
        setSearchLoading!(false)
    }

    useEffect(() => {
        if (searchType !== "content") {
            if (!moviesData) {
                setFilteredMovies([]);
                return;
            }

            // Filter by search query
            const filteredByQuery = query
                ? moviesData.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
                : moviesData;
        
            // 1) Copy → 2) Sort → 3) Filter
            const [key, order] = selectedSortBy.split(" ");
            const sortedAndFiltered = [...filteredByQuery]
                .sort((a, b) => {
                    const aVal = a[key as keyof IMovieDetail];
                    const bVal = b[key as keyof IMovieDetail];
            
                    if (key === "title" || key === "release_date") {
                        const cmp = String(aVal).localeCompare(String(bVal));
                        return order === "asc" ? cmp : -cmp;
                    }
            
                    if (key === "run_time") {
                        return order === "asc"
                            ? (aVal as number) - (bVal as number)
                            : (bVal as number) - (aVal as number);
                    }
            
                    return 0;
                })
                .filter((movie) => {
                    if (selectedGenre === "all") return true;
                    return movie.genres?.some(g => g.genre_name === selectedGenre);
                });
        
            setFilteredMovies(sortedAndFiltered);
        }
        else {
            if (!hasRun.current) {
                handleSearch()
                hasRun.current = true
            }
        }
    }, [moviesData, selectedGenre, selectedSortBy, query, searchType]);
      
    return (
        <div className="flex flex-col justify-between md:flex-row gap-4 mb-8">
            <h1 className="text-3xl font-bold">{type !== "Search" ? type : `Search Results for "${query}"`}</h1>
            <div className="flex gap-2">
                {searchType !== "content" && (<>
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Genres</SelectItem>
                            {genresData.map((genre: IGenre) => (
                                <SelectItem key={genre.genre_id} value={genre.genre_name} >
                                {genre.genre_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedSortBy} onValueChange={setSelectedSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortByData.map((sortBy) => (
                                <SelectItem key={sortBy.value} value={sortBy.value} >
                                {sortBy.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>)} 
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
 
export default GridHeader;