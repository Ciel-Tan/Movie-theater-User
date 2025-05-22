"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, Download, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatVND } from "@/utils/format"
import { useGetMovie } from "@/hooks/useGetMovie"

import QRCode from "react-qr-code";
import { useGetBooking } from "@/hooks/useGetBooking"

export default function ConfirmationPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()

  const booking_id = searchParams.get("booking_id")
  const total = searchParams.get("total")
  
  const { bookingDetail } = useGetBooking("booking_id", parseInt(booking_id!))
  
  const seats = bookingDetail?.booking_seat?.map((seat) => seat.seat_location)
  const date = bookingDetail?.showtime?.show_datetime?.slice(0, 10)
  const time = bookingDetail?.showtime?.show_datetime?.slice(11, 16)
  const cinema = bookingDetail?.showtime?.cinema?.cinema_name

  const { movieDetail } = useGetMovie(parseInt(params.id!))

  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  const handleDownload = () => {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")                     // 1. create hidden link
    link.href = dataUrl                                         // 2. point to our PNG data
    link.download = `ticket-${confirmationNumber}.png`          // 3. filename
    document.body.appendChild(link)
    link.click()                                                // 4. trigger download :contentReference[oaicite:0]{index=0}
    document.body.removeChild(link)
  }

  // Handler to share via Web Share API
  const handleShare = async () => {
    if (!navigator.canShare || !navigator.share) {
      alert("Share is not supported on this browser.")
      return
    }

    try {
      // You can share a link/text…
      await navigator.share({
        title: "Your Movie Ticket",
        text: `Here’s my ticket #${confirmationNumber}!`,
        url: window.location.href,
      })                                                         // must be triggered by a user action :contentReference[oaicite:1]{index=1}
    } catch (err) {
      console.error("Share failed:", err)
    }
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
              src={movieDetail?.poster_image || "/placeholder.svg"}
              alt={movieDetail?.title}
              className="w-32 h-48 object-cover rounded mx-auto md:mx-0 md:w-32"
            />
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="font-bold text-xl">{movieDetail?.title}</h2>
                <p className="text-muted-foreground">
                  {date} • {time}
                </p>
                <p className="text-muted-foreground">Cinema {cinema}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-1">Seats</h3>
                <div className="flex flex-wrap gap-2">
                  {seats?.map((seat) => (
                    <div key={seat} className="bg-muted px-2 py-1 rounded text-sm">
                      {seat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total Paid</span>
                  <span className="font-bold">{formatVND(parseInt(total || "0", 10))}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center rounded-lg p-6 w-max mx-auto shadow-xl">
            <QRCode
              value={`
                https://movie-theater-user.vercel.app/bookingResult?poster=${encodeURIComponent(movieDetail?.poster_image || "")}
                &title=${encodeURIComponent(movieDetail?.title || "")}
                &seats=${encodeURIComponent(seats?.join(",") || "")}
                &date=${encodeURIComponent(date || "")}
                &time=${encodeURIComponent(time || "")}
                &cinema=${encodeURIComponent(cinema || "")}
                &total=${encodeURIComponent(total || "")}
              `}
              size={240}               // px
              level="M"                // error correction level
              className="mx-auto"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
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
          <Link href="/account">View My Bookings</Link>
        </Button>
      </div>
    </div>
  )
}
