"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeatMap } from "@/components/seat-map"
import { useGetMovie } from "@/hooks/useGetMovie"
import { useGetSeatType } from "@/hooks/useGetSeatType"
import { useGetBooking } from "@/hooks/useGetBooking"
import { ISeat } from "@/types/seat"
import { useAccountContext } from "@/context/accountContext"
import { useGetAccount } from "@/hooks/useGetAccount"
import { calculateAge } from "@/utils/calculateAge"
import { useGetTicket } from "@/hooks/useGetTicket"
import { formatVND } from "@/utils/format"
import { IBooking } from "@/types/booking"
import { useGetShowtime } from "@/hooks/useGetShowtime"
import { useActionBooking } from "@/hooks/useActionBooking"
import Loader from "@/components/common/loader"

export default function BookingPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const account_id = useAccountContext()
  const searchParams = useSearchParams()

  const showtime_id = searchParams.get("showtime_id")
  const { showtimeData } = useGetShowtime(parseInt(showtime_id!))

  const date = showtimeData?.show_datetime.slice(0, 10)
  const time = showtimeData?.show_datetime.slice(11, 16)
  const cinema = showtimeData?.cinema.cinema_name

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([])

  const { movieDetail } = useGetMovie(parseInt(params.id!))
  const { accountData } = useGetAccount(account_id)
  const { seatTypesData } = useGetSeatType()
  const { ticketsData } = useGetTicket()
  const { bookingData } = useGetBooking("movie_id", parseInt(params.id!))

  const { createBookingMovie, bookingLoading, bookingError } = useActionBooking()

  const ageBasedTicketMap: { [key: string]: { maxAge: number } } = {
    children: { maxAge: 15 },
    under18: { maxAge: 18 },
    under22: { maxAge: 22 },
    adult: { maxAge: Infinity },
  };

  const getTicket = useMemo(() => {
    const userAge = calculateAge(accountData?.birthday)

    for (const ticketName in ageBasedTicketMap) {
      if (userAge <= ageBasedTicketMap[ticketName].maxAge) {
        const foundTicket = ticketsData.find(ticket => ticket.ticket_name === ticketName);
        return foundTicket
      }
    }
  }, [accountData]);

  const ticketPrice = getTicket?.ticket_price
  const bookingFee = ticketPrice! * 0.1
  const discountMembership = useMemo(() => {
    return (100 - (accountData?.membership_type.discount_rate || 0)) / 100
  }, [accountData])
  const price = useMemo(() => {
    const standardSeatCount = selectedSeats.filter(seat => seat.seat_type.seat_type_name === "Standard").length
    const vipSeatCount = selectedSeats.filter(seat => seat.seat_type.seat_type_name === "VIP").length
    const coupleSeatCount = selectedSeats.filter(seat => seat.seat_type.seat_type_name === "Couple").length
    
    return ticketPrice! * (standardSeatCount + vipSeatCount * 1.1 + coupleSeatCount * 2.2) * discountMembership
  }, [selectedSeats, ticketPrice])

  const total = price + bookingFee

  const [booking, setBooking] = useState<IBooking>()

  useEffect(() => {
    if (accountData && showtimeData && getTicket && selectedSeats) {
      setBooking({
        booking_id: 0,
        booking_datetime: new Date().toISOString(),
        booking_fee: bookingFee,
        account: accountData,
        showtime: showtimeData,
        booking_ticket: [
          {
            ticket_quantity: selectedSeats.length,
            ticket: getTicket
          }
        ],
        booking_seat: selectedSeats
      });
    }
  }, [accountData, getTicket, selectedSeats, showtimeData])

  useEffect(() => {
    console.log(booking)
  }, [booking])

  const filteredSeatOccupied = useMemo(() => {
    return bookingData
      .filter(booking => 
        booking.showtime.cinema.cinema_name === cinema && 
        booking.showtime.show_datetime === `${date} ${time}:00.000000`)
      .map(booking => booking.booking_seat)
      .flat()
  }, [bookingData])

  const handleSeatSelection = (seats: ISeat[]) => {
    setSelectedSeats(seats)
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
    else {
      router.push(`
        /booking/${params.id}
        /confirmation?seats=${selectedSeats.map(seat => seat.seat_location).join(",")}
        &date=${date}
        &time=${time}
        &cinema=${cinema}
        &total=${total}
      `)
    }
  }

  const handleCreateBooking = async () => {
    await createBookingMovie(booking!)

    if (bookingError) setCurrentStep(1)

    if (!bookingLoading) {
      handleContinue()
    }
  }

  return (
    <div className="container py-8 px-15">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href={`/movies/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movie
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Book Tickets</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled={currentStep !== 1}>
                1. Select Seats
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={currentStep !== 2}>
                2. Review Booking
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={currentStep !== 3}>
                3. Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Seats</CardTitle>
                  <CardDescription>
                    {movieDetail?.title} • {date} • {time} • Cinema {cinema}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-sm bg-primary"></div>
                      <span>Selected</span>
                    </div>
                    {seatTypesData?.map((seatType) => (
                      <div key={seatType.seat_type_id} className="flex items-center gap-2">
                        <div
                          className={`
                            ${seatType.seat_type_id === 5 ? "w-10" : "w-4"} h-4 rounded-sm border border-2 border-solid
                            ${
                              seatType.seat_type_id === 1 ? "bg-[#E2DDD5] border-none" :
                              seatType.seat_type_id === 2 ? "bg-red-500 border-none" :
                              seatType.seat_type_id === 3 ? "border-green-500" :
                              seatType.seat_type_id === 4 ? "border-yellow-500" : "border-pink-500"
                            }
                          `}
                        />
                        <span>{seatType.seat_type_name}</span>
                      </div>
                    ))}
                  </div>

                  <SeatMap
                    onSeatSelect={handleSeatSelection}
                    seatOccupied={filteredSeatOccupied}
                  />

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <Info className="h-4 w-4 inline mr-1" />
                    Select up to 8 seats. Click on a seat to select or deselect it.
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/movies/${params.id}`}>Cancel</Link>
                  </Button>
                  <Button onClick={handleContinue} disabled={selectedSeats.length === 0}>
                    Continue to Review
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="step-2" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                  <CardDescription>Please review your booking details before proceeding to payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={movieDetail?.poster_image || "/placeholder.svg"}
                        alt={movieDetail?.title}
                        className="w-24 h-36 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{movieDetail?.title}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Date: {date}</p>
                          <p>Time: {time}</p>
                          <p>Cinema: {cinema}</p>
                          <p>Duration: {movieDetail?.run_time} minutes</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Selected Seats</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seat) => (
                          <div key={seat.seat_id} className="bg-muted px-2 py-1 rounded text-sm">
                            {seat.seat_location}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Price Breakdown</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>
                            Tickets ({selectedSeats.length} × {formatVND(ticketPrice!)})
                          </span>
                          <span>{formatVND(price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Booking Fee</span>
                          <span>{formatVND(bookingFee)}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t mt-2">
                          <span>Total</span>
                          <span>{formatVND(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleContinue}>Proceed to Payment</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="step-3" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>Complete your booking by making a payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4 bg-muted/50">
                      <h3 className="font-medium mb-2">Payment Methods</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="card" name="payment" className="h-4 w-4" defaultChecked />
                          <label htmlFor="card">Credit/Debit Card</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="paypal" name="payment" className="h-4 w-4" />
                          <label htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="applepay" name="payment" className="h-4 w-4" />
                          <label htmlFor="applepay">Apple Pay</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Order Summary</h3>
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between mb-2">
                          <span>
                            {selectedSeats.length} tickets for {movieDetail?.title}
                          </span>
                          <span>{formatVND(price)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Booking Fee</span>
                          <span>{formatVND(bookingFee)}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t mt-2">
                          <span>Total</span>
                          <span>{formatVND(total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleCreateBooking}>
                    {bookingLoading ? <Loader /> : "Complete Payment"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={movieDetail?.poster_image || "/placeholder.svg"}
                    alt={movieDetail?.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{movieDetail?.title}</h3>
                    <p className="text-sm text-muted-foreground">{date}</p>
                    <p className="text-sm text-muted-foreground">{time}</p>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Selected Seats</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map((seat) => (
                        <div key={seat.seat_id} className="bg-muted px-2 py-0.5 rounded text-xs">
                          {seat.seat_location}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Price</span>
                    <span>{formatVND(price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Booking Fee</span>
                    <span>{formatVND(bookingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>{formatVND(total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
