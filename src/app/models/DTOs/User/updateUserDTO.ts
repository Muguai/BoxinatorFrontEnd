import { UserType } from "../../userType";

export interface UpdateUserDTO {
    id: number;
    uId: string;
    name: string;
    email: string;
    shippingAddress?: string | null;
    billingAddress?: string | null;
    zipCode?: string | null;
    phoneNumber?: string | null;
    birthDate?: Date | null;
    userType?: UserType | null;
    isActive: string;
    countryId?: number | null;
}