import { BoxType } from "./DTOs/Box/readBoxDTO";


export type Order = {
    name: string,
    mail: string,
    shippingAddress: string,
    billingAddress: string,
    zipCode: string,
    country: string
    instructions: string | null,
    giftMessage: string | null,
    rate: number,
    cost: number,
    content: OrderContent[]
};

export type OrderContent = {
    boxType: BoxType,
    quantity: number
}