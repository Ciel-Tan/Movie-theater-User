"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, CreditCard, Edit, LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data - would come from API/auth
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    notifications: {
      email: true,
      sms: false,
    },
  }

  // Mock booking data - would come from API
  const bookings = [
    {
      id: "B12345",
      movie: "The Adventure Begins",
      date: "May 15, 2025",
      time: "19:00",
      seats: ["C4", "C5", "C6"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+1",
      status: "upcoming",
    },
    {
      id: "B12344",
      movie: "Midnight Mystery",
      date: "May 10, 2025",
      time: "21:30",
      seats: ["F7", "F8"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+2",
      status: "past",
    },
    {
      id: "B12343",
      movie: "Cosmic Voyage",
      date: "April 28, 2025",
      time: "18:15",
      seats: ["D10", "D11", "D12"],
      image: "/placeholder.svg?height=600&width=400&text=Movie+3",
      status: "past",
    },
  ]

  return (
    <div className="container py-8 px-15">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
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
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={user.phone} disabled={!isEditing} />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Notification Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      defaultChecked={user.notifications.email}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="emailNotifications">Email notifications</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      defaultChecked={user.notifications.sms}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="smsNotifications">SMS notifications</Label>
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
                  <div className="space-y-4">
                    {bookings
                      .filter((b) => b.status === "upcoming")
                      .map((booking) => (
                        <div key={booking.id} className="flex gap-4 p-4 border rounded-lg">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.movie}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold">{booking.movie}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {booking.date} • {booking.time}
                                </p>
                                <div className="flex gap-1 mt-1">
                                  {booking.seats.map((seat) => (
                                    <span key={seat} className="bg-muted px-2 py-0.5 rounded text-xs">
                                      {seat}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm font-medium">#{booking.id}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/booking/${booking.id}/confirmation`}>View Ticket</Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                Cancel Booking
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                    {bookings.filter((b) => b.status === "upcoming").length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>You don't have any upcoming bookings. Browse our movies to book tickets.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past">
                  <div className="space-y-4">
                    {bookings
                      .filter((b) => b.status === "past")
                      .map((booking) => (
                        <div key={booking.id} className="flex gap-4 p-4 border rounded-lg">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.movie}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold">{booking.movie}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {booking.date} • {booking.time}
                                </p>
                                <div className="flex gap-1 mt-1">
                                  {booking.seats.map((seat) => (
                                    <span key={seat} className="bg-muted px-2 py-0.5 rounded text-xs">
                                      {seat}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm font-medium">#{booking.id}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline">
                                Rate Movie
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                    {bookings.filter((b) => b.status === "past").length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>You don't have any past bookings.</p>
                      </div>
                    )}
                  </div>
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
