"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for navigation in Next.js 13+
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons for edit and delete
import { client } from "../../../sanity/lib/sanityClient"; // Import your sanity client
import imageUrlBuilder from "@sanity/image-url"; // Image URL builder for Sanity

const FoodsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [foods, setFoods] = useState<any[]>([]); // State to hold the list of foods
  const router = useRouter();

  const builder = imageUrlBuilder(client); // Initialize the image URL builder

  // Function to get the URL for images
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const urlFor = (source: any) => {
    if (source && source.asset) {
      return builder.image(source).width(50).url(); // Ensure source is valid before generating the URL
    }
    return ''; // Return empty string if image source is invalid
  };

  // Fetch the foods data from Sanity
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsData = await client.fetch(
          `*[_type == "food"]{
            _id,
            name,
            description,
            price,
            available,
            image,
            category
          }`
        );
        setFoods(foodsData); // Set the fetched foods data to state
      } catch (error) {
        console.error("Error fetching foods data:", error);
      }
    };

    fetchFoods();
  }, []); // Fetch the foods when the component is mounted

  // Handle food edit
  const handleEdit = (foodId: string) => {
    router.push(`/admin/products/${foodId}/edit`); // Redirect to food edit page
  };

  // Handle food delete
  const handleDelete = async (foodId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this food?");
    if (isConfirmed) {
      try {
        // Send DELETE request to the backend API
        const response = await fetch(`/api/delete-food?foodId=${foodId}`, {
          method: "DELETE",
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message); // Show success message
          // Remove the deleted food from the state
          setFoods(foods.filter((food) => food._id !== foodId));
        } else {
          alert(result.message); // Show error message
        }
      } catch (error) {
        console.error("Error deleting food:", error);
        alert("Error deleting food.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Foods</h1>

      {/* Add New Food Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/products/add")} // Navigate to add new food page
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add New Food
        </button>
      </div>

      {/* Food List */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Food Image</th>
              <th className="px-6 py-3 text-left">Food Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Available</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">
                  {food.image && food.image.asset && (
                    <img
                      src={urlFor(food.image)} // Using the urlFor function to fetch the image URL
                      alt={food.name}
                      className="rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{food.name}</td>
                <td className="px-6 py-4">{food.description}</td>
                <td className="px-6 py-4">
                  {/* Check if price is a valid number */}
                  ${Number(food.price)?.toFixed(2) || "N/A"}
                </td>
                <td className="px-6 py-4">{food.available ? "Yes" : "No"}</td>
                <td className="px-6 py-4 flex space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(food._id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodsPage;
