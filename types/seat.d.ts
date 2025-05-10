export interface ISeatType {
    seat_type_id: number
    seat_type_name: string
}

export interface ISeat {
    seat_id: number
    seat_location: string
    seat_type: ISeatType
}