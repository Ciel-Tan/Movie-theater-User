'use client';

import Link from "next/link"
import { Clock, Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IGenre, IMovie } from "@/types/movie"
import { useGetGenre } from "@/hooks/useGetGenre";

export default function NowShowingPage() {
  const { moviesData } = useGetMovie(-2)
  const { genresData } = useGetGenre()

  return (
    <div className="container py-8 px-15">
      {/* Filters */}
      <div className="flex flex-col justify-between md:flex-row gap-4 mb-8">
        <h1 className="text-3xl font-bold">Now Showing</h1>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genresData.map((genre: IGenre) => (
                <SelectItem key={genre.genre_id} value={genre.genre_name}>
                  {genre.genre_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="title">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="rating">Rating (High to Low)</SelectItem> */}
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="duration">Duration (Short to Long)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moviesData.map((movie: IMovie) => (
          <Card key={movie.movie_id} className="overflow-hidden">
            <div className="aspect-[2/3] relative">
              <img src={movie.poster_image || "/placeholder.svg"} alt={movie.title} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 bg-black/70 text-white rounded-md px-2 py-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.age_rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="w-max">{movie.run_time} min</span>
                </div>
                <div className="line-clamp-1">{movie.genres?.map((genre) => genre.genre_name).join(", ")}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/movies/${movie.movie_id}`}>View Details</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/booking/${movie.movie_id}`}>Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
