
import { useState } from "react";
import { IPayment, IPaymentLink, IPaymentVerify } from "../types/payment";
import { createPayment, verifyPayment } from "../services/paymentService";

export const usePayment = () => {
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [payment, setPayment] = useState<IPayment | null>(null);

    const createPaymentOrder = async (paymentData: IPayment) => {
        setPaymentLoading(true);
        try {
            const data = await createPayment(paymentData);
            return data as IPaymentLink;
        }
        catch (error) {
            console.error("Error createPayment: ", error);
            setPaymentError("Failed to create payment");
        }
        finally {
            setPaymentLoading(false);
        }
    };

    const verifyPaymentOrder = async (orderCode: number) => {
        setPaymentLoading(true);
        try {
            const data = await verifyPayment(orderCode);
            return data as IPaymentVerify;
        }
        catch (error) {
            console.error("Error verifyPayment: ", error);
            setPaymentError("Failed to verify payment");
        }
        finally {
            setPaymentLoading(false);
        }
    };

    return { createPaymentOrder, paymentLoading, paymentError, verifyPaymentOrder };
}