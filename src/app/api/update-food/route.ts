import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../sanity/lib/sanityClient";

export async function PUT(req: NextRequest) {
  const foodId = req.nextUrl.searchParams.get("foodId");

  if (!foodId) {
    return NextResponse.json({ message: "Food ID is required" }, { status: 400 });
  }

  const updatedFood = await req.json();
  const { name, description, price, available, imageUrl, image } = updatedFood;

  let imageData = null;

  if (imageUrl) {
    imageData = { _type: "url", url: imageUrl }; // Save external image URL
  } else if (image) {
    imageData = { _type: "image", asset: { _ref: image } }; // Save Sanity image reference
  }

  try {
    const updated = await client
      .patch(foodId)
      .set({
        name,
        description,
        price,
        available,
        image: imageData,
      })
      .commit();

    return NextResponse.json({ message: "Food updated successfully", updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating food:", error);
    return NextResponse.json({ message: "Error updating food." }, { status: 500 });
  }
}
