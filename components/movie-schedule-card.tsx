// components/MovieScheduleCard.tsx (or a similar path)
"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { IMovieDetail, IShowtime } from "@/types/movie" // Assuming IShowtime is defined here or import separately
import { useGetBooking } from "@/hooks/useGetBooking"
import { useGetSeat } from "@/hooks/useGetSeat" // Assuming you need seatsData here too

interface MovieScheduleCardProps {
  movie: IMovieDetail;
  getSeatStatus: (availableSeats: number) => { status: string; color: string };
}

export function MovieScheduleCard({ movie, getSeatStatus }: MovieScheduleCardProps) {
  const { bookingData } = useGetBooking("movie_id", movie.movie_id)
  const { seatsData } = useGetSeat()

  const calculateAvailableSeats = (showtime: IShowtime) => {
    let seatsTaken = 0
    bookingData
      .filter((booking) => booking.showtime.showtime_id === showtime.showtime_id)
      .forEach((booking) => {
        seatsTaken += booking.booking_seat.length
      })
    return seatsData.length - seatsTaken
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 shrink-0">
            <img
              src={movie.poster_image || "/placeholder.svg"}
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
                      <span>{movie.run_time} min</span>
                    </div>
                    <div>{movie.genres.map((genre) => genre.genre_name).join(", ")}</div>
                  </div>
                </div>
                <Link href={`/movies/${movie.movie_id}`}>
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
                {movie.showtime?.map((showtime, index) => {
                  const availableSeats = calculateAvailableSeats(showtime)
                  const seatStatus = getSeatStatus(availableSeats)
                  const displayShowtime = format(new Date(showtime.show_datetime), "HH:mm")
                  const endTime = new Date(showtime.show_datetime)
                  endTime.setMinutes(endTime.getMinutes() + movie.run_time)
                  const endTimeString = format(endTime, "HH:mm")

                  return (
                    <TooltipProvider key={`${showtime.showtime_id}-${index}`}> {/* Ensure unique key */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="relative" asChild>
                            <Link
                              href={`/booking/${movie.movie_id}?showtime_id=${showtime.showtime_id}`}
                            >
                              <span>{displayShowtime} - <span className="text-muted-foreground">{endTimeString}</span></span>
                              <span className={`absolute bottom-0 left-0 right-0 h-1 ${seatStatus.color}`}></span>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p>Room {showtime.room.room_name}</p>
                            <p>{availableSeats} seats available</p>
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
  )
}