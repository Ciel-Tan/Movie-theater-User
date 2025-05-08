"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Download, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const seats = searchParams.get("seats")?.split(",") || []

  // Generate a random confirmation number
  const [confirmationNumber, setConfirmationNumber] = useState("")

  useEffect(() => {
    // Generate a random alphanumeric confirmation number
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setConfirmationNumber(result)
  }, [])

  // Mock movie data - would come from API
  const movie = {
    id: params.id,
    title: "The Adventure Begins",
    date: "May 15, 2025",
    time: "19:00",
    auditorium: "1",
    image: "/placeholder.svg?height=600&width=400&text=Movie+Poster",
  }

  return (
    <div className="container py-8 px-15 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your tickets have been booked successfully. We've sent a confirmation to your email.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center border-b">
          <CardTitle>CielTanMovies Tickets</CardTitle>
          <CardDescription>Confirmation #{confirmationNumber}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="w-full md:w-32 h-48 object-cover rounded"
            />
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="font-bold text-xl">{movie.title}</h2>
                <p className="text-muted-foreground">
                  {movie.date} • {movie.time}
                </p>
                <p className="text-muted-foreground">Auditorium {movie.auditorium}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Seats</h3>
                <div className="flex flex-wrap gap-2">
                  {seats.map((seat) => (
                    <div key={seat} className="bg-muted px-2 py-1 rounded text-sm">
                      {seat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total Paid</span>
                  <span className="font-bold">${(seats.length * 12.99 + 1.5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="bg-muted p-4 rounded-lg w-64 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">QR</div>
                <div className="text-sm text-muted-foreground">Scan at the theater</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>

      <div className="flex gap-4 justify-center items-center">
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/account/bookings">View My Bookings</Link>
        </Button>
      </div>
    </div>
  )
}
