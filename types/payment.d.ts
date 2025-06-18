export interface IPayment {
    orderCode: number;
    amount: number;
    description: string;
    returnUrl: string;
    cancelUrl: string;
}

export interface IPaymentLink {
    checkoutUrl: string;
}

export interface IPaymentVerify {
    orderCode: number;
    ok: boolean;
    status: string;
}