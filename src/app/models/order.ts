import { BoxType } from "./boxType";

export type Order = {
    name: string,
    shippingAddress: string,
    billingAddress: string,
    mail: string,
    zipCode: string,
    country: string
    instructions: string | null,
    giftMessage: string | null,
    rate: number,
    cost: number,
    content: OrderContent[]
};

type OrderContent = {
    boxType: BoxType,
    quantity: number
}