import { RegionType } from "../../regionType";

export interface ReadCountryDTO {
    id: number;
    name: string;
    shippingRate: number;
    region: RegionType;
    users: number[] | null;
    shipments: number[] | null;
}