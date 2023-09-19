import { Status } from "../../status";

export interface CreateShipmentDTO {
    email: string;
    shippingAddress: string;
    billingAddress: string;
    zipCode: string;
    instructions: string | null;
    giftMessage: string | null;
    userId: number | null; 
    countryId: number;
    BoxShipments: BoxInfo[]; 
}

export interface BoxInfo{
    boxId: number;
    quantity: number
} 
