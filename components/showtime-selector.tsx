"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IShowtime } from "@/types/movie"

interface ShowtimeSelectorProps {
  showtimes?: IShowtime[]
  movieId: number
}

export function ShowtimeSelector({ showtimes = [], movieId }: ShowtimeSelectorProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null)
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null)

  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE, MMM d"),
      isToday: i === 0,
    }
  })

  const handleTimeSelect = (cinema_name: string, time: string, showtime_id: number) => {
    setSelectedCinema(cinema_name)
    setSelectedTime(time)
    setSelectedShowtimeId(showtime_id)
  }

  const handleBooking = () => {
    if (selectedShowtimeId) {
      router.push(`/booking/${movieId}?showtime_id=${selectedShowtimeId}`)
    }
  }

  const getGroupedShowtimes = () => {
    const showtimesForDay = showtimes?.filter((showtime) =>
      showtime.show_datetime.startsWith(selectedDate)
    );

    if (!showtimesForDay) {
      return {};
    }

    return showtimesForDay.reduce((acc, showtime) => {
      const cinemaName = showtime.cinema.cinema_name;
      if (!acc[cinemaName]) {
        acc[cinemaName] = [];
      }
      acc[cinemaName].push(showtime);
      return acc;
    }, {} as Record<string, IShowtime[]>);
  };

  const groupedShowtimes = getGroupedShowtimes();
  const cinemas = Object.keys(groupedShowtimes);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Select Date</h3>
          <div className="flex overflow-x-auto pb-2 gap-2">
            {dates.map((date) => (
              <Button
                key={date.value}
                variant={selectedDate === date.value ? "default" : "outline"}
                className="min-w-[120px]"
                onClick={() => setSelectedDate(date.value)}
              >
                <div className="flex flex-col">
                  <span>{date.isToday ? "Today" : date.label.split(",")[0]}</span>
                  <span className="text-xs">{date.label.split(",")[1]}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Select Time</h3>
          {cinemas.length > 0 ? (
            cinemas.map((cinemaName) => (
              <div key={cinemaName} className="mb-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  {cinemaName}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {groupedShowtimes[cinemaName].map((showtime) => (
                    <Button
                      key={showtime.showtime_id}
                      variant={
                        selectedTime === showtime.show_datetime.slice(11, 16) && selectedCinema === cinemaName
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleTimeSelect(
                          cinemaName,
                          showtime.show_datetime.slice(11, 16),
                          showtime.showtime_id
                        )
                      }
                    >
                      {showtime.show_datetime.slice(11, 16)}
                    </Button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="mb-4">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                No showtimes available for selected date
              </h4>
            </div>
          )}
        </div>

        <Button className="w-full mt-4" disabled={!selectedShowtimeId} onClick={handleBooking}>
          Continue to Seat Selection
        </Button>
      </CardContent>
    </Card>
  )
}
