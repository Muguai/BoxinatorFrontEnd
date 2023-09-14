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

const mockUser: ReadUserDTO = {
    id: -1, 
    uId: "Loading...", 
    name: "Loading...", 
    email: "Loading...", 
    shippingAddress: "Loading...",
    billingAddress: "Loading...", 
    zipCode: "Loading...", 
    phoneNumber: "Loading...", 
    birthDate: null, 
    countryId: null, 
    isActive: "Loading...", 
    shipment: null, 
  };