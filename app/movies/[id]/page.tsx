'use client'

import { CalendarDays, Clock, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShowtimeSelector } from "@/components/showtime-selector"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovieDetail } from "@/types/movie"
import { useParams } from "next/navigation"
import { formatDay } from "@/utils/formatDay"

export default function MovieDetail() {
  const params : { id: string } = useParams()
  const movie_id = parseInt(params.id, 10)
  const { moviesData, loading } = useGetMovie(movie_id)
  const movie = moviesData?.[0] as IMovieDetail

  if (loading) {
    return <div className="container py-8 px-15">Loading...</div>
  }

  return (
    <div className="container py-8 px-15">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster and Quick Info */}
        <div>
          <div className="sticky top-24">
            <div className="aspect-[2/3] mb-4">
              <img
                src={movie?.poster_image || "/placeholder.svg"}
                alt={movie?.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">T{movie?.age_rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>{movie?.run_time} min</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie?.genres.map((genre) => (
                  <span key={genre.genre_id} className="bg-muted px-2 py-1 rounded text-sm">
                    {genre.genre_name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-5 w-5" />
                <span>Release Date: {formatDay({ date: movie?.release_date })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="actors">Director & Actor</TabsTrigger>
              <TabsTrigger value="trailer">Watch Trailer</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground mb-6">{movie?.description}</p>
            </TabsContent>
            <TabsContent value="actors" className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="text-muted-foreground mb-4">{movie?.director.director_name}</p>

              <h2 className="text-xl font-semibold mb-2">Actors</h2>
              <div>
                {movie?.actors?.map((actor) => actor.actor_name).join(", ")}
              </div>
            </TabsContent>
            <TabsContent value="trailer" className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Official Trailer</h2>
              <div className="aspect-video mb-4">
                <iframe
                  src={movie?.trailer_link}
                  title="YouTube video player"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </TabsContent>
          </Tabs>

          {/* Showtime Section */}
          <div id="showtime">
            <h2 className="text-2xl font-bold mb-4">Showtime</h2>
            <ShowtimeSelector showtimes={movie?.showtime} movieId={movie_id} />
          </div>
        </div>
      </div>
    </div>
  )
}
