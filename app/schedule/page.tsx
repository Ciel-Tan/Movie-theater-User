"use client"

import { useState } from "react"
import Link from "next/link"
import { format, addDays } from "date-fns"
import { CalendarDays, Clock, Filter, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SchedulePage() {
  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE, MMM d"),
      isToday: i === 0,
    }
  })

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].value)
  const [selectedAuditorium, setSelectedAuditorium] = useState<string | null>(null)

  // This would typically come from an API based on the selected date
  const movies = [
    {
      id: 1,
      title: "The Adventure Begins",
      rating: 4.5,
      duration: 125,
      genres: ["Action", "Adventure"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+1",
      showtimes: [
        { time: "10:00", auditorium: "1", availableSeats: 45 },
        { time: "13:30", auditorium: "1", availableSeats: 32 },
        { time: "17:00", auditorium: "1", availableSeats: 78 },
        { time: "20:30", auditorium: "1", availableSeats: 12 },
        { time: "11:15", auditorium: "2", availableSeats: 56 },
        { time: "14:45", auditorium: "2", availableSeats: 23 },
        { time: "18:15", auditorium: "2", availableSeats: 67 },
        { time: "21:45", auditorium: "2", availableSeats: 89 },
      ],
    },
    {
      id: 2,
      title: "Midnight Mystery",
      rating: 4.2,
      duration: 118,
      genres: ["Thriller", "Mystery"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+2",
      showtimes: [
        { time: "11:30", auditorium: "3", availableSeats: 34 },
        { time: "15:00", auditorium: "3", availableSeats: 56 },
        { time: "18:30", auditorium: "3", availableSeats: 23 },
        { time: "22:00", auditorium: "3", availableSeats: 67 },
      ],
    },
    {
      id: 3,
      title: "Cosmic Voyage",
      rating: 4.7,
      duration: 142,
      genres: ["Sci-Fi", "Drama"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+3",
      showtimes: [
        { time: "10:45", auditorium: "2", availableSeats: 78 },
        { time: "14:15", auditorium: "2", availableSeats: 45 },
        { time: "17:45", auditorium: "2", availableSeats: 23 },
        { time: "21:15", auditorium: "2", availableSeats: 12 },
      ],
    },
    {
      id: 4,
      title: "Laughter Lane",
      rating: 3.9,
      duration: 95,
      genres: ["Comedy", "Family"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+4",
      showtimes: [
        { time: "09:30", auditorium: "1", availableSeats: 89 },
        { time: "12:00", auditorium: "1", availableSeats: 67 },
        { time: "14:30", auditorium: "1", availableSeats: 45 },
        { time: "17:00", auditorium: "1", availableSeats: 23 },
        { time: "19:30", auditorium: "1", availableSeats: 12 },
      ],
    },
    {
      id: 5,
      title: "Historical Heroes",
      rating: 4.3,
      duration: 156,
      genres: ["History", "Drama"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+5",
      showtimes: [
        { time: "13:00", auditorium: "3", availableSeats: 56 },
        { time: "16:45", auditorium: "3", availableSeats: 34 },
        { time: "20:30", auditorium: "3", availableSeats: 78 },
      ],
    },
  ]

  // Filter showtimes based on selected auditorium
  const filteredMovies = selectedAuditorium
    ? movies
        .map((movie) => ({
          ...movie,
          showtimes: movie.showtimes.filter((showtime) => showtime.auditorium === selectedAuditorium),
        }))
        .filter((movie) => movie.showtimes.length > 0)
    : movies

  const auditoriums = [
    { id: "1", name: "Auditorium 1" },
    { id: "2", name: "Auditorium 2 (IMAX)" },
    { id: "3", name: "Auditorium 3 (VIP)" },
  ]

  // Function to determine seat availability status and color
  const getSeatStatus = (availableSeats: number) => {
    if (availableSeats < 20) return { status: "Limited", color: "bg-orange-500" }
    if (availableSeats < 50) return { status: "Available", color: "bg-green-500" }
    return { status: "Many", color: "bg-green-700" }
  }

  return (
    <div className="container py-8 px-15">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Movie Schedule</h1>
        <div className="flex items-center gap-2">
          <Select value={selectedAuditorium || ""} onValueChange={(value) => setSelectedAuditorium(value || null)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Auditoriums" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Auditoriums</SelectItem>
              {auditoriums.map((auditorium) => (
                <SelectItem key={auditorium.id} value={auditorium.id}>
                  {auditorium.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setSelectedAuditorium(null)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue={selectedDate} onValueChange={setSelectedDate} className="w-full mb-8">
        <TabsList className="grid grid-cols-7 h-auto">
          {dates.map((date) => (
            <TabsTrigger key={date.value} value={date.value} className="py-2">
              <div className="flex flex-col items-center">
                <span className="font-medium">{date.isToday ? "Today" : date.label.split(",")[0]}</span>
                <span className="text-xs">{date.label.split(",")[1]}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        <span>Showing schedule for {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}</span>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-700"></div>
          <span>Many seats</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
          <span>Limited seats</span>
        </div>
      </div>

      <div className="space-y-6">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 shrink-0">
                  <img
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    className="h-full w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="mb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{movie.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{movie.duration} min</span>
                          </div>
                          <div>{movie.genres.join(", ")}</div>
                        </div>
                      </div>
                      <Link href={`/movies/${movie.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="font-medium mb-3">Showtimes</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {movie.showtimes.map((showtime, index) => {
                        const seatStatus = getSeatStatus(showtime.availableSeats)
                        return (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="relative" asChild>
                                  <Link
                                    href={`/booking/${movie.id}?date=${selectedDate}&time=${showtime.time}&auditorium=${showtime.auditorium}`}
                                  >
                                    <span>{showtime.time}</span>
                                    <span className={`absolute bottom-0 left-0 right-0 h-1 ${seatStatus.color}`}></span>
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs">
                                  <p>Auditorium {showtime.auditorium}</p>
                                  <p>{showtime.availableSeats} seats available</p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <Info className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Showtimes Available</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no showtimes available for the selected filters. Please try selecting a different date or
              auditorium.
            </p>
            <Button className="mt-4" onClick={() => setSelectedAuditorium(null)}>
              View All Showtimes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
