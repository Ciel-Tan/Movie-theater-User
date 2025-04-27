"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SeatMapProps {
  onSeatSelect: (seats: string[]) => void
}

export function SeatMap({ onSeatSelect }: SeatMapProps) {
  // This would typically come from an API
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const seatsPerRow = 12

  // Mock taken seats - would come from API
  const takenSeats = [
    "A3",
    "A4",
    "A5",
    "B7",
    "B8",
    "C1",
    "C2",
    "C12",
    "D5",
    "D6",
    "D7",
    "D8",
    "E10",
    "E11",
    "F3",
    "F4",
    "G9",
    "G10",
    "G11",
    "H1",
    "H2",
    "H3",
  ]

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const toggleSeat = (seat: string) => {
    if (takenSeats.includes(seat)) return

    setSelectedSeats((prev) => {
      const newSelection = prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]

      // Limit to 8 seats
      const finalSelection = newSelection.slice(0, 8)

      // Notify parent component
      onSeatSelect(finalSelection)

      return finalSelection
    })
  }

  const getSeatStatus = (seat: string) => {
    if (takenSeats.includes(seat)) return "taken"
    if (selectedSeats.includes(seat)) return "selected"
    return "available"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8 p-2 bg-muted/30 text-center rounded">Screen</div>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1">
            <div className="w-6 text-center font-medium">{row}</div>
            <div className="flex gap-1">
              {Array.from({ length: seatsPerRow }).map((_, index) => {
                const seatNumber = index + 1
                const seat = `${row}${seatNumber}`
                const status = getSeatStatus(seat)

                return (
                  <button
                    key={seat}
                    className={cn(
                      "w-6 h-6 text-xs rounded-sm flex items-center justify-center transition-colors",
                      status === "available" && "border hover:bg-muted/50",
                      status === "selected" && "bg-primary text-primary-foreground",
                      status === "taken" && "bg-muted cursor-not-allowed",
                    )}
                    onClick={() => toggleSeat(seat)}
                    disabled={status === "taken"}
                    aria-label={`Seat ${seat} ${status}`}
                  >
                    {seatNumber}
                  </button>
                )
              })}
            </div>
            <div className="w-6 text-center font-medium">{row}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
