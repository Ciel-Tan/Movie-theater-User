"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ShowtimeSelectorProps {
  movieId: string
}

export function ShowtimeSelector({ movieId }: ShowtimeSelectorProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedAuditorium, setSelectedAuditorium] = useState<string | null>(null)

  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE, MMM d"),
      isToday: i === 0,
    }
  })

  // Mock showtimes data - this would come from an API
  const auditoriums = [
    {
      id: "1",
      name: "Auditorium 1",
      times: ["10:00", "13:30", "17:00", "20:30"],
    },
    {
      id: "2",
      name: "Auditorium 2 (IMAX)",
      times: ["11:15", "14:45", "18:15", "21:45"],
    },
    {
      id: "3",
      name: "Auditorium 3 (VIP)",
      times: ["12:00", "15:30", "19:00", "22:30"],
    },
  ]

  const handleTimeSelect = (auditoriumId: string, time: string) => {
    setSelectedAuditorium(auditoriumId)
    setSelectedTime(time)
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedAuditorium) {
      router.push(`/booking/${movieId}?date=${selectedDate}&time=${selectedTime}&auditorium=${selectedAuditorium}`)
    }
  }

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
          {auditoriums.map((auditorium) => (
            <div key={auditorium.id} className="mb-4">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">{auditorium.name}</h4>
              <div className="flex flex-wrap gap-2">
                {auditorium.times.map((time) => (
                  <Button
                    key={`${auditorium.id}-${time}`}
                    variant={selectedTime === time && selectedAuditorium === auditorium.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelect(auditorium.id, time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4" disabled={!selectedTime || !selectedAuditorium} onClick={handleBooking}>
          Continue to Seat Selection
        </Button>
      </CardContent>
    </Card>
  )
}
