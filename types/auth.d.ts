export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    full_name: string;
    gender: boolean;
    birthday: string;
    id_number: string;
    phone_number: string;
}

export interface IToken {
    token: string;
}

export interface IAuthResponse extends IToken {
    expiresIn: number;
}

export interface IVerifyToken extends IToken {
    secret: string;
}