export type Order = {
    name: string,
    shippingAddress: string,
    billingAddress: string,
    mail: string,
    zipCode: string,
    country: string
    instructions: string | null,
    giftMessage: string | null,
    rate: number,
    cost: number,
    content: OrderContent[]
};

type OrderContent = {
    boxType: BoxType,
    quantity: number
}

export enum BoxType {
    NordicDelightsBox = "Nordics Delights Box",
    VikingLegendsBox = "Viking Legends Box",
    HyggeHomeBox = "Hygge Home Box",
    ScandinavianDesignBox = "Scandinavian Design Box",
    MidsummerMagicBox = "Midsummer Magic Box",
    ArcticAdventureBox = "Arctic Adventure Box",
    ForestForagerBox = "Forest Forager Box",
    MysticalFjordBox = "Mystical Fjord Box"
}