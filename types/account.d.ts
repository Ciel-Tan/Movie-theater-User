export interface ITokenPayLoad {
    account_id: number
    role_name: string
}

export interface IAccount {
    account_id: number
    birthday: string
    email: string
    full_name: string
    gender: boolean
    id_number: string
    phone_number: string
    role: {
        role_id: number
        role_name: string
    }
    membership_type: {
        membership_id: number
        membership_name: string
        discount_rate: number
    }
}