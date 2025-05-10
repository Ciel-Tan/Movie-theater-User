"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { useGetSeat } from "@/hooks/useGetSeat"
import { ISeat } from "@/types/seat"

interface SeatMapProps {
  onSeatSelect: (seats: ISeat[]) => void
  seatOccupied: ISeat[]
}

export function SeatMap({ onSeatSelect, seatOccupied }: SeatMapProps) {
  const { seatsData } = useGetSeat()
  const { rows, seatsPerRow } = useMemo(() => {
    const counts: Record<string, number> = {}

    for (const seat of seatsData || []) {
      const match = seat.seat_location.match(/^[A-Za-z]+/)
      if (match) {
        const row = match[0]
        counts[row] = (counts[row] || 0) + 1
      }
    }
    
    const rows = Object.keys(counts)
    return { rows, seatsPerRow: counts }
  }, [seatsData])

  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([])

  const toggleSeat = (seat: string) => {
    if (seatOccupied.some((s) => s.seat_location === seat)) return
    
    setSelectedSeats((prev) => {
      const newSelection = prev
        .map((s) => s.seat_location).includes(seat)
          ? prev.filter((s) => s.seat_location !== seat)
          : [
            ...prev,
            seatsData.find((s) => s.seat_location === seat)!
          ]

      return newSelection.slice(0, 8)
    })
  }

  useEffect(() => {
    onSeatSelect(selectedSeats)
  }, [selectedSeats, onSeatSelect])


  const getSeatStatus = (seat: string) => {
    if (seatOccupied.find((s) => s.seat_location === seat)) return "Occupied"
    if (selectedSeats.map((s) => s.seat_location).includes(seat)) return "Selected"
    return "Available"
  }

  const getSeatType = (seat: string) => {
    const seatData = seatsData.find((s) => s.seat_location === seat)
    const seatType = seatData?.seat_type.seat_type_name

    if (seatType === 'Standard') return 'border-green-500'
    else if (seatType === 'VIP') return 'border-yellow-500'
    else if (seatType === 'Couple') return 'border-pink-500'
    else 'bg-red-500 border-none'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8 p-2 bg-muted text-center rounded">
        Screen
      </div>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1">
            <div className="w-6 text-right font-medium mr-2">{row}</div>
            <div className="flex gap-1">
              {Array.from({ length: seatsPerRow[row] }).map((_, index) => {
                const seatNumber = index + 1
                const seat = `${row}${seatNumber}`
                const status = getSeatStatus(seat)

                return (
                  <button
                    key={seat}
                    className={cn(
                      `${row === 'CP' ? 'w-[3.25rem]' : 'w-6'} h-6 text-xs rounded-sm flex items-center justify-center transition-colors border border-2`,
                      status === "Available" && `${getSeatType(seat)} hover:bg-primary hover:text-primary-foreground`,
                      status === "Occupied" && "bg-[#E2DDD5] cursor-not-allowed border-none",
                      status === "Selected" && "bg-primary text-primary-foreground border-none",
                    )}
                    onClick={() => toggleSeat(seat)}
                    disabled={status === "Occupied"}
                    aria-label={`Seat ${seat} ${status}`}
                  >
                    {seatNumber}
                  </button>
                )
              })}
            </div>
            <div className="w-6 text-left font-medium ml-2">{row}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
