import { Status } from "../../status"

export interface ReadShipmentDTO {
    id: number,
    created: Date,
    status: Status | null,
    email: string,
    shippingAddress: string,
    billingAddress: string,
    zipCode: string,
    instructions: string | null,
    giftMessage: string | null,
    totalCost: number,
    userId: number,
    countryId: number
}

export const mockShipment: ReadShipmentDTO = {
    id: -1,
    created: new Date(),
    status: null,
    email: 'Loading...',
    shippingAddress: "",
    billingAddress: "",
    zipCode: "",
    instructions: null,
    giftMessage: null,
    totalCost: 0,
    userId: 0,
    countryId: 0
}