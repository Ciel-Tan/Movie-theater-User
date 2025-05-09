export interface IAddress {
    address_id: number
    address_name: string
}

export interface ICinema {
    cinema_id: number
    cinema_name: string
    address: IAddress
}