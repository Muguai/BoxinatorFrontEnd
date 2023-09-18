import { RegionType } from "../../regionType";

export interface UpdateCountryDTO {
    id: number,
    name: string,
    shippingRate: number,
    region: RegionType
}