import { Status } from "../../status";

export interface CreateShipmentDTO {
    email: string;
    shippingAddress: string;
    billingAddress: string;
    zipCode: string;
    instructions: string | null;
    giftMessage: string | null;
    userId: number | null; 
    countryId: number | null;
    BoxShipments: BoxInfo[] | null; 
}

export interface BoxInfo{
    boxId: number;
    quantity: number
} 
