import { api } from "@/utils/axios";
import { IPayment } from "../types/payment";

export const createPayment = async (paymentData: IPayment) => {
    try {
        const { data: payment } = await api.post("/api/payments/create", paymentData);
        return payment;
    }
    catch (error) {
        console.error("Error in createPayment service:", error);
        return error;
    }
};

export const verifyPayment = async (orderCode: number) => {
    try {
        const { data: payment } = await api.get(`/api/payments/verify?orderCode=${orderCode}`);
        return payment;
    }
    catch (error) {
        console.error("Error in verifyPayment service:", error);
        return error;
    }
};