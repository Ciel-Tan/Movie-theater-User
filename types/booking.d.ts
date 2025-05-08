import { IAccount } from "./account"
import { IMovieDetailWithShowtime } from "./movie"

export interface IBooking {
    booking_id: number
    booking_datetime: string
    booking_fee: number
    account: IAccount
    showtime: IMovieDetailWithShowtime,
    booking_ticket: [
        {
            ticket_quantity: number
            ticket: {
                ticket_id: number
                ticket_name: string
                ticket_price: number
            }
        }
    ]
    booking_seat: [
        {
            seat_id: number
            seat_location: string
            seat_type: {
                seat_type_id: number
                seat_type_name: string
            }
        }
    ]
}