import { CalendarDays, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ComingSoonPage() {
  // This would typically come from an API
  const movies = [
    {
      id: 101,
      title: "Future Frontiers",
      releaseDate: "June 15, 2025",
      genres: ["Sci-Fi", "Action"],
      synopsis:
        "In a world where technology has advanced beyond imagination, one person discovers a secret that could change humanity forever.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+1",
    },
    {
      id: 102,
      title: "Whispers in the Dark",
      releaseDate: "June 22, 2025",
      genres: ["Horror", "Thriller"],
      synopsis: "A family moves into a new home, only to discover that they are not alone in the darkness.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+2",
    },
    {
      id: 103,
      title: "Love in Paris",
      releaseDate: "July 1, 2025",
      genres: ["Romance", "Comedy"],
      synopsis:
        "Two strangers meet in the city of love and embark on a whirlwind romance that will change their lives.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+3",
    },
    {
      id: 104,
      title: "The Last Champion",
      releaseDate: "July 10, 2025",
      genres: ["Sports", "Drama"],
      synopsis:
        "A disgraced athlete gets one last chance at redemption in the most challenging competition of their career.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+4",
    },
    {
      id: 105,
      title: "Kingdom of Dreams",
      releaseDate: "July 24, 2025",
      genres: ["Fantasy", "Adventure"],
      synopsis: "A young hero must journey through a magical realm to save their kingdom from an ancient evil.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+5",
    },
    {
      id: 106,
      title: "The Heist",
      releaseDate: "August 5, 2025",
      genres: ["Crime", "Action"],
      synopsis:
        "A team of expert thieves plan the most daring heist in history, but not everything goes according to plan.",
      image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+6",
    },
  ]

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
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
              <SelectItem value="thriller">Thriller</SelectItem>
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
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
            <div className="aspect-[2/3] relative">
              <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="object-cover w-full h-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>Coming {movie.releaseDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <div className="text-sm text-muted-foreground mb-2">{movie.genres.join(", ")}</div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{movie.synopsis}</p>
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
