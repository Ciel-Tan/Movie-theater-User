'use client';

import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovieDetail } from "@/types/movie"
import { useState } from "react";
import GridHeader from "./grid-header";
import MovieGrid from "./movie-grid";

interface MoviePageProps {
  type: string;
}

export default function MoviePage({ type }: MoviePageProps) {
  const [filteredMovies, setFilteredMovies] = useState<IMovieDetail[]>([]);

  const { moviesData, loading, error } = useGetMovie(type === "Now Showing" ? -2 : -1)

  return (
    <div className="container py-8 px-15">
      {/* Filters */}
      <GridHeader type={type} moviesData={moviesData} setFilteredMovies={setFilteredMovies} />

      {/* Movie Grid */}
      <MovieGrid type={type} data={filteredMovies} loading={loading} error={error} />
    </div>
  )
}
