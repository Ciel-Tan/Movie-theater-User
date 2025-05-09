"use client"

import Link from "next/link"
import { CalendarDays, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovie, IMovieDetail } from "@/types/movie"
import { formatDay } from "@/utils/formatDay"
import Loader from "./common/loader"

export function MovieCarousel({ type }: { type: string }) {
  const { moviesData, loading, error } = useGetMovie(type === "now-showing" ? -2 : -1)

  return (
    loading ? (
      <div className="h-[400px] flex items-center justify-center">
        <Loader color="black" />
      </div>
    ) :
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {moviesData?.map((movie: IMovieDetail) => (
            <CarouselItem key={movie.movie_id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card className="overflow-hidden">
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.poster_image || "/placeholder.svg"}
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                  {type === "now-showing" ? (
                    <div className="absolute top-2 right-2 bg-black/70 text-white rounded-md px-2 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{movie.age_rating}</span>
                    </div>
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="text-white">
                        <div className="flex items-center gap-2 text-sm mb-1">
                          <CalendarDays className="h-4 w-4" />
                          <span>Coming {formatDay({ date: movie.release_date })}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      {type === "now-showing" && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className="w-max">{movie.run_time} min</span>
                        </div>
                      )}
                      <div className="line-clamp-1">
                        {movie.genres?.map((genre) => genre.genre_name).join(", ")}
                      </div>
                    </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/movies/${movie.movie_id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/booking/${movie.movie_id}`}>
                        {type === "now-showing" ? "Book Now" : "Remind Me"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative static translate-y-0" />
          <CarouselNext className="relative static translate-y-0" />
        </div>
      </Carousel>
  )
}
