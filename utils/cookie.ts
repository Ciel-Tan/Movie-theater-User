import { IAuthResponse } from "@/types/auth";
import Cookies from "js-cookie";

export const getCookieToken = () => {
    const token = Cookies.get('token');
    return token
}

export const createCookieToken = ({ token, expiresIn }: IAuthResponse) => {
    const expires = expiresIn / (24 * 60 * 60);
    return Cookies.set('token', token, { expires: expires });
};

export const removeCookieToken = () => {
    return Cookies.remove('token');
}