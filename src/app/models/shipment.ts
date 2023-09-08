import { Box,dummyBoxes } from "./mysteryBox"; // Import the Box interface from your module
import { Status } from "./status"

// Define the Shipment and ShipmentContent types
export type Shipment = {
  id: number,
  name: string;
  date: string,
  shippingAddress: string;
  billingAddress: string;
  mail: string;
  zipCode: string;
  country: string;
  instructions: string | null;
  giftMessage: string | null;
  rate: number;
  cost: number;
  status: Status;
  content: ShipmentContent[];
};

type ShipmentContent = {
  Box: Box;
};

// Dummy shipments
const dummyShipments: Shipment[] = [
  {
    id: 1,
    name: "John Doe",
    date: "2023-09-08",
    shippingAddress: "123 Main St, Apt 4B",
    billingAddress: "123 Main St, Apt 4B",
    mail: "john.doe@example.com",
    zipCode: "12345",
    country: "USA",
    instructions: null,
    giftMessage: null,
    rate: 0,
    cost: 0,
    status: Status.Processing,
    content: [
      { Box: dummyBoxes[0] },
      { Box: dummyBoxes[2] },
    ],
  },
  {
    id: 2,
    name: "Alice Smith",
    date: "2023-09-09",
    shippingAddress: "456 Elm St, Suite 5A",
    billingAddress: "456 Elm St, Suite 5A",
    mail: "alice.smith@example.com",
    zipCode: "67890",
    country: "USA",
    instructions: "Leave at the front door",
    giftMessage: null,
    rate: 0,
    cost: 0,
    status: Status.Shipped,
    content: [
      { Box: dummyBoxes[1] },
      { Box: dummyBoxes[3] },
    ],
  },
  {
    id: 3,
    name: "Bob Johnson",
    date: "2023-09-10",
    shippingAddress: "789 Oak Ave, Unit 3C",
    billingAddress: "789 Oak Ave, Unit 3C",
    mail: "bob.johnson@example.com",
    zipCode: "54321",
    country: "USA",
    instructions: null,
    giftMessage: "Happy Birthday!",
    rate: 0,
    cost: 0,
    status: Status.Delivered,
    content: [{ Box: dummyBoxes[4] }],
  },
  {
    id: 4,
    name: "Eve Wilson",
    date: "2023-09-11",
    shippingAddress: "101 Pine Rd, Apt 2D",
    billingAddress: "101 Pine Rd, Apt 2D",
    mail: "eve.wilson@example.com",
    zipCode: "98765",
    country: "USA",
    instructions: null,
    giftMessage: null,
    rate: 0,
    cost: 0,
    status: Status.Processing,
    content: [{ Box: dummyBoxes[5] }],
  },
  {
    id: 5,
    name: "Charlie Brown",
    date: "2023-09-12",
    shippingAddress: "321 Cedar Ln, House",
    billingAddress: "321 Cedar Ln, House",
    mail: "charlie.brown@example.com",
    zipCode: "13579",
    country: "USA",
    instructions: "Deliver after 5 PM",
    giftMessage: "Congratulations!",
    rate: 0,
    cost: 0,
    status: Status.Shipped,
    content: [{ Box: dummyBoxes[6] }],
  },
];

export default dummyShipments;