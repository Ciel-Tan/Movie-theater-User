"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovieDetail } from "@/types/movie"
import { formatRuntime } from "@/utils/format"

// Mock movie data - in a real app, this would come from an API
// const mockMovies = [
//   {
//     id: 1,
//     title: "The Adventure Begins",
//     genre: "Action, Adventure",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+1",
//   },
//   {
//     id: 2,
//     title: "Midnight Mystery",
//     genre: "Thriller, Mystery",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+2",
//   },
//   {
//     id: 3,
//     title: "Cosmic Voyage",
//     genre: "Sci-Fi, Drama",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+3",
//   },
//   {
//     id: 4,
//     title: "Laughter Lane",
//     genre: "Comedy, Family",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+4",
//   },
//   {
//     id: 5,
//     title: "Historical Heroes",
//     genre: "History, Drama",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+5",
//   },
//   {
//     id: 6,
//     title: "Ocean Depths",
//     genre: "Documentary, Nature",
//     image: "/placeholder.svg?height=600&width=400&text=Movie+6",
//   },
//   {
//     id: 101,
//     title: "Future Frontiers",
//     genre: "Sci-Fi, Action",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+1",
//   },
//   {
//     id: 102,
//     title: "Whispers in the Dark",
//     genre: "Horror, Thriller",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+2",
//   },
//   {
//     id: 103,
//     title: "Love in Paris",
//     genre: "Romance, Comedy",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+3",
//   },
//   {
//     id: 104,
//     title: "The Last Champion",
//     genre: "Sports, Drama",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+4",
//   },
//   {
//     id: 105,
//     title: "Kingdom of Dreams",
//     genre: "Fantasy, Adventure",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+5",
//   },
//   {
//     id: 106,
//     title: "The Heist",
//     genre: "Crime, Action",
//     image: "/placeholder.svg?height=600&width=400&text=Coming+Soon+6",
//   },
// ]

export function SearchDropdown() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [filteredMovies, setFilteredMovies] = useState<IMovieDetail[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const { moviesData } = useGetMovie(0)

    // Filter movies based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMovies([])
            return
        }

        if (moviesData) {
            const filtered = moviesData.filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredMovies(filtered.slice(0, 5)) // Limit to 5 results
        }
        else {
            // If moviesData is not yet available, set filteredMovies to an empty array
            setFilteredMovies([])
        }
    }, [searchQuery])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle search submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
        router.push(`/searchResult?q=${encodeURIComponent(searchQuery)}`)
            setIsOpen(false)
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search movies..."
                        className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                    />
                </div>
            </form>

            {isOpen && filteredMovies.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
                    <ul className="py-1">
                        {filteredMovies.map((movie) => (
                            <li key={movie.movie_id}>
                                <Link
                                    href={`/movies/${movie.movie_id}`}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="h-12 w-9 flex-shrink-0 overflow-hidden rounded">
                                        <img
                                            src={movie.poster_image || "/placeholder.svg"}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">{movie.title}</div>
                                        <div className="line-clamp-1 text-xs text-muted-foreground">
                                            {movie.genres.map((genre) => genre.genre_name).join(", ")}
                                        </div>
                                        <div className="line-clamp-2 text-xs text-muted-foreground">
                                            T{movie.age_rating} • {movie.release_date.slice(0, 4)} • {formatRuntime(movie.run_time)}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t p-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-sm text-muted-foreground"
                            onClick={() => {
                                router.push(`/searchResult?q=${encodeURIComponent(searchQuery)}`)
                                setIsOpen(false)
                            }}
                        >
                            <Search className="mr-2 h-3.5 w-3.5" />
                            Search for "{searchQuery}"
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}