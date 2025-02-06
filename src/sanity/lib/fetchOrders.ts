// sanity/lib/fetchOrders.ts
import { client } from './sanityClient';
import { Order } from '../types/index'; // Import the Order type

export const fetchOrders = async (): Promise<Order[]> => {
  const query = `*[_type == "order"]{
    _id,
    status,
    total,
    createdAt,
    items[] {
      productId,
      name,
      price,
      quantity,
      image
    },
    shippingDetails {
      firstName,
      lastName,
      email,
      phone,
      company,
      country,
      city,
      zipCode,
      address1,
      address2
    }
  }`;

  const orders = await client.fetch(query);
  return orders;
};
