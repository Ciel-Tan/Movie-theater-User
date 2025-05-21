"use client"

import { useEffect, useMemo, useState } from "react"
import { format, addDays } from "date-fns"
import { CalendarDays, Filter, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMovie } from "@/hooks/useGetMovie"
import { IMovieDetail } from "@/types/movie"
import { useGetCinema } from "@/hooks/useGetCinema"
import { MovieScheduleCard } from "@/components/movie-schedule-card"

export default function SchedulePage() {
  const { moviesData } = useGetMovie(0)
  const { cinemasData } = useGetCinema()
  
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i)
      return {
        value: format(date, "yyyy-MM-dd"),
        label: format(date, "EEE, MMM d"),
        isToday: i === 0,
      }
    })
  }, [])

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].value)
  const [selectedCinema, setSelectedCinema] = useState<string>("")

  useEffect(() => {
    if (cinemasData.length && !selectedCinema) {
      setSelectedCinema(cinemasData[0].cinema_name)
    }
  }, [cinemasData, selectedCinema])

  const seatLegend = [
    { label: "Many seats", color: "bg-green-700" },
    { label: "Available", color: "bg-green-500" },
    { label: "Limited seats", color: "bg-orange-500" },
  ]

  const getSeatStatus = (availableSeats: number) => {
    if (availableSeats < 40) return { status: "Limited", color: "bg-orange-500" }
    if (availableSeats < 80) return { status: "Available", color: "bg-green-500" }
    return { status: "Many", color: "bg-green-700" }
  }

  const filteredMovies= useMemo(() => {
    if (!moviesData || !selectedCinema) return []

    const now = Date.now()

    return moviesData?.map((movie) => {
      const filteredShowtime = movie.showtime?.filter((showtime) =>
        showtime.show_datetime.startsWith(selectedDate) &&
        showtime.cinema.cinema_name === selectedCinema &&
        new Date(showtime.show_datetime).getTime() >= now
      )

      if (filteredShowtime && filteredShowtime.length > 0) {
        return { ...movie, showtime: filteredShowtime }
      }
      return null
    })
    .filter((movie): movie is IMovieDetail => movie !== null)
  }, [moviesData, selectedDate, selectedCinema])

  return (
    <div className="container py-8 px-15">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Movie Schedule</h1>
        <div className="flex items-center gap-2">
          <Select value={selectedCinema} onValueChange={(value) => setSelectedCinema(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={"Select Cinema"} />
            </SelectTrigger>
            <SelectContent>
              {cinemasData.map((cinema) => (
                <SelectItem key={cinema.cinema_id} value={cinema.cinema_name}>
                  {cinema.cinema_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setSelectedCinema("")}>
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
        {seatLegend.map(({ label, color}) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`h-3 w-3 rounded-full ${color}`}></div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {filteredMovies?.map((movie: IMovieDetail) => (
          <MovieScheduleCard
            key={movie.movie_id}
            movie={movie}
            getSeatStatus={getSeatStatus}
          />
        ))}

        {filteredMovies?.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <Info className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Showtimes Available</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no showtimes available for the selected cinema {selectedCinema} filters. Please try selecting a different date or cinema.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
