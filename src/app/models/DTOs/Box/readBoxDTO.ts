export interface ReadBoxDTO {
    id: number,
    boxName: string; 
    description: string;
    imageUrl: string;
    price: number;
    weight: number;
    content: string;
    dimensions: string;
}

export const mockBox: ReadBoxDTO = {
    id: -1,
    boxName: 'Loading...',
    description: 'Loading...',
    imageUrl: '',
    price: 0,
    weight: 0,
    content: 'Loading...',
    dimensions: ''
}