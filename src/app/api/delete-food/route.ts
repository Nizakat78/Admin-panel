import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/sanityClient"; // Assuming the path to sanity client is correct

// Named export for DELETE method
export async function DELETE(req: Request) {
  try {
    // Get query parameters from the request
    const url = new URL(req.url);
    const foodId = url.searchParams.get("foodId");

    if (!foodId) {
      return NextResponse.json({ message: "Food ID is required." }, { status: 400 });
    }

    // Delete the food item from Sanity
    const deletedFood = await client.delete(foodId);

    if (!deletedFood) {
      return NextResponse.json({ message: "Food not found or deletion failed." }, { status: 404 });
    }

    return NextResponse.json({ message: "Food deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json({ message: "Error deleting food." }, { status: 500 });
  }
}
