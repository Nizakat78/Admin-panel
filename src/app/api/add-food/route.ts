import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/sanityClient"; // Your sanity client import

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the incoming JSON request body

    const {
      name,
      description,
      price,
      originalPrice,
      tags,
      available,
      category,
      imageUrl,
    } = body;

    // Create a new food item in Sanity
    const newFood = await client.create({
      _type: "food",
      name,
      description,
      price: price || undefined,  // Only add price if it's provided
      originalPrice: originalPrice || undefined,  // Handle optional originalPrice
      tags,
      available,
      category,
      imageUrl,
    });

    // Return a successful response with JSON
    return NextResponse.json(
      { message: "Food added successfully", newFood },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding food:", error);
    
    // Return an error response with JSON
    return NextResponse.json(
      { message: "Error adding food" },
      { status: 500 }
    );
  }
}
