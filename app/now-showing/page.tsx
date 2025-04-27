import Link from "next/link"
import { Clock, Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NowShowingPage() {
  // This would typically come from an API
  const movies = [
    {
      id: 1,
      title: "The Adventure Begins",
      rating: 4.5,
      duration: 125,
      genres: ["Action", "Adventure"],
      synopsis: "An epic journey through uncharted territories leads to unexpected discoveries.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+1",
    },
    {
      id: 2,
      title: "Midnight Mystery",
      rating: 4.2,
      duration: 118,
      genres: ["Thriller", "Mystery"],
      synopsis: "A detective races against time to solve a series of puzzling crimes in the city.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+2",
    },
    {
      id: 3,
      title: "Cosmic Voyage",
      rating: 4.7,
      duration: 142,
      genres: ["Sci-Fi", "Drama"],
      synopsis:
        "Astronauts venture into the unknown reaches of space, facing both external dangers and personal demons.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+3",
    },
    {
      id: 4,
      title: "Laughter Lane",
      rating: 3.9,
      duration: 95,
      genres: ["Comedy", "Family"],
      synopsis: "A heartwarming tale of a family finding joy in the most unexpected places.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+4",
    },
    {
      id: 5,
      title: "Historical Heroes",
      rating: 4.3,
      duration: 156,
      genres: ["History", "Drama"],
      synopsis: "Based on true events, this film chronicles the courage of ordinary people in extraordinary times.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+5",
    },
    {
      id: 6,
      title: "Ocean Depths",
      rating: 4.1,
      duration: 132,
      genres: ["Documentary", "Nature"],
      synopsis: "Explore the mysterious world beneath the waves in this stunning documentary.",
      image: "/placeholder.svg?height=600&width=400&text=Movie+6",
    },
  ]

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
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
              <SelectItem value="thriller">Thriller</SelectItem>
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
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
            <div className="aspect-[2/3] relative">
              <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 bg-black/70 text-white rounded-md px-2 py-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration} min</span>
                </div>
                <div>{movie.genres.join(", ")}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.synopsis}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/movies/${movie.id}`}>View Details</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/booking/${movie.id}`}>Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
