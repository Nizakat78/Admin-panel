import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/sanityClient'; // Import the Sanity client

export async function GET(req: Request) {
  try {
    // Extract userId dynamically from the request (e.g., cookies, headers, etc.)
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');  // Retrieve the userId from the query params

    if (!userId) {
      // If userId is not present in query params, respond with an error
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch orders for the provided userId
    const orders = await client.fetch(
      `*[_type == "order" && userId == $userId]{
        _id,
        total,
        createdAt,
        status,
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
          address1,
          address2,
          city,
          country,
          zipCode,
          phone
        }
      }`,
      { userId }
    );

    // Return orders if found
    if (orders && orders.length > 0) {
      return NextResponse.json({ success: true, orders });
    }

    // If no orders, return empty message
    return NextResponse.json(
      { success: true, message: 'No orders found for this user', orders: [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
