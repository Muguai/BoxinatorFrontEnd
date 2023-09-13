export interface ReadCountryDTO {
    id: number;
    name: string;
    shippingRate: number;
    region: RegionType;
    users: number[] | null;
    shipments: number[] | null;
  }
  
  export enum RegionType {
    NA = 'NA',
    CA = 'CA',
    SA = 'SA',
    EU = 'EU',
    AS = 'AS',
    AF = 'AF',
    OC = 'OC',
    AU = 'AU',
    ME = 'ME',
    MI = 'MI',
    PO = 'PO',
    SCANDINAVIA = 'SCANDINAVIA'
  }