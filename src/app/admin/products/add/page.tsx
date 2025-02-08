"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Food {
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: string;
  imageUrl: string;
  tags: string[]; // Tags should be an array of strings
  originalPrice: number;
}

const AddFoodPage = () => {
  const router = useRouter();

  const [food, setFood] = useState<Food>({
    name: "",
    description: "",
    price: 0,
    available: false,
    category: "",
    imageUrl: "",
    tags: [],
    originalPrice: 0,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  // Handle food image URL change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFood((prev) => ({ ...prev, imageUrl: e.target.value }));
  };

  // Handle tags change
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFood((prev) => ({
      ...prev,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure price and originalPrice are numbers and greater than 0
    let { price, originalPrice } = food;
    if (price <= 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      price = undefined as any; // Remove price if it's 0 or invalid
    }
    if (originalPrice <= 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      originalPrice = undefined as any; // Remove originalPrice if it's 0 or invalid
    }

    try {
      const response = await fetch("/api/add-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...food,
          price,
          originalPrice,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Success message
        router.push("/admin/products"); // Redirect to the foods page
      } else {
        alert(result.message); // Error message
      }
    } catch (error) {
      console.error("Error adding food:", error);
      alert("Error adding food.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Food</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Food Name</label>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={food.price > 0 ? food.price : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setFood((prev) => ({ ...prev, price: value >= 0 ? value : 0 }));
            }}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Original Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={food.originalPrice > 0 ? food.originalPrice : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setFood((prev) => ({ ...prev, originalPrice: value >= 0 ? value : 0 }));
            }}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={food.category}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            value={food.tags.join(", ")}
            onChange={handleTagsChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter tags separated by commas (e.g., Best Seller, Popular)"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700">Food Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={food.imageUrl}
            onChange={handleImageChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Enter image URL"
          />
        </div>

        {/* Available */}
        <div className="mb-4">
          <label className="block text-gray-700">Available</label>
          <select
            name="available"
            value={food.available ? "Yes" : "No"}
            onChange={(e) => setFood({ ...food, available: e.target.value === "Yes" })}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFoodPage;
