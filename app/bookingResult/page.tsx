'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatVND } from "@/utils/format";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

const BookingResultPage = () => {
    const searchParams = useSearchParams()
    const poster = decodeURIComponent(searchParams.get("poster") || "")
    const title = decodeURIComponent(searchParams.get("title") || "")
    const seats = decodeURIComponent(searchParams.get("seats") || "")
    const date = decodeURIComponent(searchParams.get("date") || "")
    const time = decodeURIComponent(searchParams.get("time") || "")
    const cinema = decodeURIComponent(searchParams.get("cinema") || "")
    const total = decodeURIComponent(searchParams.get("total") || "")

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
                    {/* <CardDescription>Confirmation #{confirmationNumber}</CardDescription> */}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img
                            src={poster || "/placeholder.svg"}
                            alt={title || ""}
                            className="w-32 h-48 object-cover rounded mx-auto md:mx-0 md:w-32"
                        />
                        <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="font-bold text-xl">{title || ""}</h2>
                            <p className="text-muted-foreground">
                                {date} • {time}
                            </p>
                            <p className="text-muted-foreground">Cinema {cinema}</p>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm mb-1">Seats</h3>
                            <div className="flex flex-wrap gap-2">
                                {seats?.split(",").map((seat) => (
                                    <div key={seat} className="bg-muted px-2 py-1 rounded text-sm">
                                    {   seat}
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
                </CardContent>
            </Card>
        </div>
    );
}
 
export default BookingResultPage;