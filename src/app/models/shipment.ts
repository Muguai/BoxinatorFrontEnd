import { Box, dummyBoxes } from './mysteryBox';
import { Status } from './status';

export type Shipment = {
  id: number;
  name: string;
  date: string;
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
  content: Box[]; // Change ShipmentContent[] to Box[]
};


// Modify your dummy data to match the updated structure
const dummyShipments: Shipment[] = [
  {
    id: 1,
    name: 'John Doe',
    date: '2023-09-08',
    shippingAddress: '123 Main St, Apt 4B',
    billingAddress: '123 Main St, Apt 4B',
    mail: 'john.doe@example.com',
    zipCode: '12345',
    country: 'USA',
    instructions: null,
    giftMessage: null,
    rate: 0,
    cost: 0,
    status: Status.Processing,
    content: [dummyBoxes[0], dummyBoxes[1], dummyBoxes[2], dummyBoxes[3], dummyBoxes[4]],
  },
  {
    id: 2,
    name: 'Alice Smith',
    date: '2023-09-09',
    shippingAddress: '456 Elm St, Suite 5A',
    billingAddress: '456 Elm St, Suite 5A',
    mail: 'alice.smith@example.com',
    zipCode: '67890',
    country: 'USA',
    instructions: 'Leave at the front door',
    giftMessage: null,
    rate: 0,
    cost: 0,
    status: Status.Shipped,
    content: [dummyBoxes[1], dummyBoxes[3]],
  },
  // Add more shipments here...
];

export default dummyShipments;
