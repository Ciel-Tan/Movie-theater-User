import { IAccount } from "./account"
import { IMovieDetailWithShowtime } from "./movie"
import { ISeat } from "./seat"

export interface ITicket {
    ticket_id: number
    ticket_name: string
    ticket_price: number
}

export interface IBooking {
    booking_id: number
    booking_datetime: string
    booking_fee: number
    total_price: number
    account: IAccount
    showtime: IMovieDetailWithShowtime,
    booking_ticket: [
        {
            ticket_quantity: number
            ticket: ITicket
        }
    ]
    booking_seat: ISeat[]
}