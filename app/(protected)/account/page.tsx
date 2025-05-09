"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, CreditCard, Edit, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAccountContext } from "@/context/accountContext"
import { useGetAccount } from "@/hooks/useGetAccount"
import { IAccount } from "@/types/account"
import { calculateAge } from "@/utils/calculateAge"
import { useGetBooking } from "@/hooks/useGetBooking"
import { IBooking } from "@/types/booking"
import Loader from "@/components/common/loader"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  
  const account_id = useAccountContext()
  const { accountData, loading, error } = useGetAccount(account_id)

  const [account, setAccount] = useState<IAccount>({} as IAccount)
  const { bookingData, bookingLoading, bookingError } = useGetBooking(account_id)
  const bookings: IBooking[] = bookingData
  console.log(bookings)

  useEffect(() => {
    setAccount(accountData as IAccount)
  }, [accountData])

  if (loading || bookingLoading) return (
    <div className="h-[400px] flex items-center justify-center">
      <Loader color="black" />
    </div>
  )
  if (error || bookingError) return <div>Error: {error}</div>

  const getUpcomingBookings = (): IBooking[] => {
    return bookings.filter((b: IBooking) => new Date(b.booking_datetime).getTime() > Date.now())
  }

  const getPastBookings = (): IBooking[] => {
    return bookings.filter((b: IBooking) => new Date(b.booking_datetime).getTime() < Date.now())
  }

  return (
    <div className="container py-8 px-15">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <CalendarDays className="h-4 w-4 mr-2" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal information and preferences</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={account.full_name}
                      onChange={(e) => setAccount({ ...account, full_name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <div className="flex items-center space-x-4 h-8">
                      <Label htmlFor="male" className="flex items-center gap-2">
                        <Input
                          type="radio"
                          name="gender"
                          className="w-4 h-4"
                          id="male"
                          defaultValue="true"
                          defaultChecked={account.gender}
                          onChange={(e) => setAccount({ ...account, gender: e.target.checked })}
                          disabled={!isEditing}
                        />
                        Male
                      </Label>
                      <Label htmlFor="female" className="flex items-center gap-2">
                        <Input
                          type="radio"
                          name="gender"
                          className="w-4 h-4"
                          id="female"
                          defaultValue="false"
                          defaultChecked={!account.gender}
                          onChange={(e) => setAccount({ ...account, gender: e.target.checked })}
                          disabled={!isEditing}
                        />
                        Female
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={account.email}
                      onChange={(e) => setAccount({ ...account, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="phone"
                      defaultValue={calculateAge(account.birthday)}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="_number">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue={account.phone_number}
                      onChange={(e) => setAccount({ ...account, phone_number: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id_number">Id Number</Label>
                    <Input
                      id="phone"
                      defaultValue={account.id_number}
                      onChange={(e) => setAccount({ ...account, id_number: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your upcoming and past bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  {bookingLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <Loader color="black" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getUpcomingBookings().map((booking: IBooking) => (
                          <div key={booking.booking_id} className="flex gap-4 p-4 border rounded-lg">
                            <img
                              src={booking.showtime.movie.poster_image || "/placeholder.svg"}
                              alt={booking.showtime.movie.title}
                              className="w-20 h-auto object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold">{booking.showtime.movie.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {booking.showtime.show_datetime.slice(0, 10)} • {booking.showtime.show_datetime.slice(11, 16)}
                                  </p>
                                  <div className="flex gap-1 mt-1">
                                    {booking.booking_seat.map((seat) => (
                                      <span key={seat.seat_id} className="bg-muted px-2 py-0.5 rounded text-xs">
                                        {seat.seat_location}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-sm font-medium">#{booking.booking_id}</div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/booking/${booking.booking_id}/confirmation`}>View Ticket</Link>
                                </Button>
                                <Button size="sm" variant="outline">
                                  Cancel Booking
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                      {getUpcomingBookings().length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>You don't have any upcoming bookings. Browse our movies to book tickets.</p>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past">
                  {bookingLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <Loader color="black" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getPastBookings().map((booking) => (
                          <div key={booking.booking_id} className="flex gap-4 p-4 border rounded-lg">
                            <img
                              src={booking.showtime.movie.poster_image || "/placeholder.svg"}
                              alt={booking.showtime.movie.title}
                              className="w-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold">{booking.showtime.movie.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {booking.showtime.show_datetime.slice(0, 10)} • {booking.showtime.show_datetime.slice(11, 16)}
                                  </p>
                                  <div className="flex gap-1 mt-1">
                                    {booking.booking_seat.map((seat) => (
                                      <span key={seat.seat_id} className="bg-muted px-2 py-0.5 rounded text-xs">
                                        {seat.seat_location}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-sm font-medium">#{booking.booking_id}</div>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/booking/${booking.booking_id}/confirmation`}>View Ticket</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                      {getPastBookings().length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>You don't have any past bookings.</p>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Saved Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 05/2026</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Add New Payment Method</h3>
                  <Button>Add Payment Method</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
