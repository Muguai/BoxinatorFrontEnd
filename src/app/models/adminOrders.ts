export type Order = {
    id: number,
    date: string,
    user: string,
    status: Status
}

export enum Status {
    Placed = 'Placed',
    Processing = 'Processing',
    Cancelled = 'Cancelled',
    Packing = 'Packing',
    Shipped = 'Shipped',
    InTransit = 'In Transit',
    OutForDelivery = 'Out For Delivery',
    Delivered = 'Delivered',
    AttemptedDelivery = 'Attempted Delivery',
    LostInTransit = 'Lost In Transit',
    Delayed = 'Delayed',
    Exception = 'Exception'
}