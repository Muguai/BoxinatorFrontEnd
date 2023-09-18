export interface ReadBoxDTO {
    id: number,
    boxType: BoxType | 'Loading...' | BoxTypeValues; 
    description: string;
    imageUrl: string;
    price: number;
    weight: number;
    content: string;
    dimensions: string;
}

export enum BoxType {
    NordicDelightsBox = 'Nordics Delights Box',
    VikingLegendsBox = 'Viking Legends Box',
    HyggeHomeBox = 'Hygge Home Box',
    ScandinavianDesignBox = 'Scandinavian Design Box',
    MidsummerMagicBox = 'Midsummer Magic Box',
    ArcticAdventureBox = 'Arctic Adventure Box',
    ForestForagerBox = 'Forest Forager Box',
    MysticalFjordBox = 'Mystical Fjord Box'
}

// contains all BoxType values
type BoxTypeValues = `${BoxType}`;

export const mockBox: ReadBoxDTO = {
    id: -1,
    boxType: 'Loading...',
    description: 'Loading...',
    imageUrl: '',
    price: 0,
    weight: 0,
    content: 'Loading...',
    dimensions: ''
}