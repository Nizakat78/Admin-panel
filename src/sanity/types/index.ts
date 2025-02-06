// types/index.ts

export type ShippingDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    country: string;
    city: string;
    zipCode: string;
    address1: string;
    address2?: string;
  };
  
  export type OrderItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string; // Optional, because not all items may have an image
  };
  
  export type Order = {
    _id: string;
    status: 'pending' | 'completed';
    total: number;
    createdAt: string;
    items: OrderItem[];
    shippingDetails: ShippingDetails;
  };
  