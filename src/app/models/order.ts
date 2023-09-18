export interface Order {
    name?: string,
    email: string,
    shippingAddress: string,
    billingAddress: string,
    zipCode: string,
    country?: string
    instructions: string | null,
    giftMessage: string | null,
    rate?: number,
    cost: number,
    content: OrderContent[]
};

export type OrderContent = {
    boxName: string,
    quantity: number
}