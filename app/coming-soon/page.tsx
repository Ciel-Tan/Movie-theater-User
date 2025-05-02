'use client'
import { CalendarDays, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IGenre, IMovie } from "@/types/movie"
import { useGetGenre } from "@/hooks/useGetGenre"

export default function ComingSoonPage() {
  const { moviesData } = useGetMovie(-1)
  const { genresData } = useGetGenre()

  return (
    <div className="container py-8 px-15">
      {/* Filters */}
      <div className="flex flex-col justify-between md:flex-row gap-4 mb-8">
        <h1 className="text-3xl font-bold">Coming Soon</h1>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {/* <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
              <SelectItem value="thriller">Thriller</SelectItem> */}
              {genresData.map((genre: IGenre) => (
                <SelectItem key={genre.genre_id} value={genre.genre_name}>
                  {genre.genre_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="date">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Release Date (Soonest)</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Coming {movie.release_date}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <div className="text-sm text-muted-foreground mb-2">{movie.genres?.map((genre) => genre.genre_name).join(", ")}</div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Watch Trailer
                </Button>
                <Button size="sm">Remind Me</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
