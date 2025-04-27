import Link from "next/link"
import { CalendarDays, Clock, Film, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShowtimeSelector } from "@/components/showtime-selector"

export default function MovieDetail({ params }: { params: { id: string } }) {
  // This would typically come from an API based on the ID
  const movie = {
    id: params.id,
    title: "The Adventure Begins",
    rating: 4.5,
    duration: 125,
    releaseDate: "May 15, 2025",
    genres: ["Action", "Adventure"],
    director: "Jane Smith",
    cast: ["John Doe", "Mary Johnson", "Robert Williams", "Sarah Davis"],
    synopsis:
      "An epic journey through uncharted territories leads to unexpected discoveries. When a group of explorers stumble upon an ancient artifact, they unwittingly set in motion a chain of events that will test their courage, loyalty, and determination. As they navigate treacherous landscapes and face formidable adversaries, they must also confront their own fears and limitations. This visually stunning adventure combines heart-pounding action with emotional depth, creating an unforgettable cinematic experience.",
    image: "/placeholder.svg?height=600&width=400&text=Movie+Poster",
    gallery: [
      "/placeholder.svg?height=400&width=600&text=Scene+1",
      "/placeholder.svg?height=400&width=600&text=Scene+2",
      "/placeholder.svg?height=400&width=600&text=Scene+3",
      "/placeholder.svg?height=400&width=600&text=Scene+4",
    ],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }

  return (
    <div className="container py-8 px-15">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster and Quick Info */}
        <div>
          <div className="sticky top-24">
            <div className="aspect-[2/3] mb-4">
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{movie.rating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration} min</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre} className="bg-muted px-2 py-1 rounded text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-5 w-5" />
                <span>Release Date: {movie.releaseDate}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="#showtimes">Book Tickets</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Film className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="text-muted-foreground mb-6">{movie.synopsis}</p>
            </TabsContent>
            <TabsContent value="cast" className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="text-muted-foreground mb-4">{movie.director}</p>

              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.cast.map((actor) => (
                  <div key={actor} className="text-center">
                    <div className="aspect-square bg-muted rounded-full overflow-hidden mb-2 flex items-center justify-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p>{actor}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Showtimes Section */}
          <div id="showtimes">
            <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
            <ShowtimeSelector movieId={movie.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
