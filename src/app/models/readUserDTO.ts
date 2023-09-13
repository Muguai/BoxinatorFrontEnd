export interface ReadUserDTO {
    id: number
    uId: string
    name: string;
    email: string;
    shippingAddress: string | null;
    billingAddress: string | null;
    zipCode: string | null;
    phoneNumber: string | null;
    birthDate: Date | null;
    countryId: number | null;
    isActive: string;
    shipment: number[] | null;
}