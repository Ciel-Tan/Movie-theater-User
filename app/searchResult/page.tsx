'use client'

import { useGetMovie } from "@/hooks/useGetMovie"
import { useSearchParams } from "next/navigation"
import GridHeader from "@/components/grid-header"
import { useState } from "react"
import { IMovieDetail } from "@/types/movie"
import MovieGrid from "@/components/movie-grid"
import { ISearch } from "@/types/search"
import SearchGrid from "@/components/search-grid"

export default function SearchPage() {
    const params = useSearchParams()
    const searchType = params.get('type') ?? 'title'
    const query = params.get('q') ?? ''

    const [filteredMovies, setFilteredMovies] = useState<IMovieDetail[]>([])
    const [searchData, setSearchData] = useState<ISearch[]>([])

    const { moviesData, loading, error } = useGetMovie(0)

    return (
        <div className="container py-8 px-15">
            {/* Filters */}
            <GridHeader
                type="Search"
                moviesData={moviesData}
                setFilteredMovies={setFilteredMovies}
                setSearchData={setSearchData}
                searchType={searchType}
                query={query}
            />

            {/* Results */}
            {searchType !== "content" ? (
                <MovieGrid type="Now Showing" data={filteredMovies} loading={loading} error={error} />
            ) : (
                <SearchGrid data={searchData} query={query} />
            )}
        </div>
    )
}
