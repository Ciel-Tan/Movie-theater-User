'use client'

import { Clock, Filter, Type } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMovie } from "@/hooks/useGetMovie"
import { useSearchParams } from "next/navigation"
import GridHeader from "@/components/grid-header"
import { useState } from "react"
import { IMovieDetail } from "@/types/movie"
import MovieGrid from "@/components/movie-grid"

export default function SearchPage() {
    const params = useSearchParams()
    const query = params.get('q') ?? ''

    const [filteredMovies, setFilteredMovies] = useState<IMovieDetail[]>([])

    const { moviesData, loading, error } = useGetMovie(0)

    return (
        <div className="container py-8 px-15">
            {/* Filters */}
            <GridHeader
                type="Search"
                moviesData={moviesData}
                setFilteredMovies={setFilteredMovies}
                query={query}
            />

            {/* Results */}
            <MovieGrid type="Now Showing" data={filteredMovies} loading={loading} error={error} />
        </div>
    )
}
