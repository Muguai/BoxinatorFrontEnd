
export interface Box {
    id: number,
    boxType: string;
    description: string;
    imageUrl: string;
    price: number;
    weight: number;
    content: string;
    dimensions: string;
    amount: number;
  }
  
  export const commonImageUrl = '/assets/img/QuestionBlock.png';
  
  //Dummy boxes for testing purposes without having to pull them from the database
  export const dummyBoxes: Box[] = [
    {
      id: 1,
      boxType: "Arctic Adventure Box",
      description: "Exploration gear for the rugged adventurer",
      imageUrl: '/assets/img/Arctic.jpg',
      price: 99.99,
      weight: 92.2,
      content: "Thermos, Pocket Knife, Compass, Warm Gloves, Guidebook",
      dimensions: "10x10x10",
      amount: 1
    },
    {
      id: 2,
      boxType: "Hygge Home Box",
      description: "Cozy essentials for creating a warm and inviting atmosphere",
      imageUrl: '/assets/img/Home.jpg', 
      price: 88.88,
      weight: 95.2,
      content: "Scented Candle, Soft Blanket, Mugs, Journal",
      dimensions: "20x20x20",
      amount: 1
    },
    {
      id: 3,
      boxType: "Forest Forager Box",
      description: "A foraging kit",
      imageUrl: '/assets/img/Forest.jpg', 
      price: 44.88,
      weight: 55.2,
      content: "Field Guide, Harvest Tool, Dried Mushrooms, Herb Tea, Soap",
      dimensions: "30x30x30",
      amount: 1
    },
    {
      id: 4,
      boxType: "Viking Legends Box",
      description: "Items inspired by Viking history and mythology",
      imageUrl: '/assets/img/Viking.jpg', 
      price: 45.88,
      weight: 45.2,
      content: "Pendant, Rune Stone Coaster, Mead Maker, Novel",
      dimensions: "40x40x40",
      amount: 1

    },
    {
      id: 5,
      boxType: "Mystical Fjord Box",
      description: "Items inspired by the mystery of Scandinavian fjords",
      imageUrl: '/assets/img/Fjord.jpg',
      price: 65.88,
      weight: 25.2,
      content: "Jigsaw Puzzle, Bath Salt, Nordic Myths, Art Print",
      dimensions: "15x15x15",
      amount: 1

    },
    {
      id: 6,
      boxType: "Midsummer Magic Box",
      description: "Celebrate the enchanting Swedish Midsummer festival with items like flower crowns",
      imageUrl: '/assets/img/Midsummer.jpg', 
      price: 55.88,
      weight: 44.2,
      content: "Flower Crown, Berry Tea, SkinCare Products, Dance Guide",
      dimensions: "25x25x25",
      amount: 1

    },
    {
      id: 7,
      boxType: "Nordic Delights Box",
      description: "Gourmet Scandinavian treats",
      imageUrl: '/assets/img/Delights.jpg', 
      price: 66.88,
      weight: 88.2,
      content: "Lingonberry Preserve, Crispbread, Smoked Salmon, Cloudberry Jam, Artisan Chocolate",
      dimensions: "35x35x35",
      amount: 1

    },
    {
      id: 8,
      boxType: "Scandinavian Design Box",
      description: "Chic home decor items that showcase the minimalist elegance of Scandinavian design",
      imageUrl: '/assets/img/Design.jpg', 
      price: 77.88,
      weight: 77.2,
      content: "Geometric Planter, Wooden Utensils, Art Print",
      dimensions: "45x25x30",
      amount: 1

    },
  ];