"use client"
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { client } from '../../../../../sanity/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

interface Food {
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: string;
  imageUrl: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

interface EditFoodPageProps {
  params: Promise<{ foodId: string }>;
}

const builder = imageUrlBuilder(client);

// Fetch the food data based on foodId
async function fetchFoodData(foodId: string): Promise<Food> {
  const food = await client.fetch(
    `*[_type == "food" && _id == $foodId][0]`,
    { foodId }
  );
  return food;
}

export default function EditFoodPage({ params }: EditFoodPageProps) {
  // Use the `use` hook to handle the async params
  const { foodId } = use(params);
  const food = use(fetchFoodData(foodId));

  const router = useRouter();

  // Display loading message while the data is being fetched
  if (!food) {
    return <div>Loading...</div>;
  }

  // Form submission logic (for updating food data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission here (update the food details)
    console.log('Form submitted');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Food</h1>

      {/* Back Button */}
      <button
        onClick={() => router.push('/admin/products')}
        className="mb-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
      >
        <FaArrowLeft className="mr-2" />
        Back to Foods
      </button>

      {/* Edit Food Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
          <input
            id="name"
            type="text"
            value={food.name}
            onChange={(e) => food.name = e.target.value}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
          <textarea
            id="description"
            value={food.description}
            onChange={(e) => food.description = e.target.value}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold">Price</label>
          <input
            id="price"
            type="number"
            value={food.price}
            onChange={(e) => food.price = parseFloat(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
          <input
            id="category"
            type="text"
            value={food.category}
            onChange={(e) => food.category = e.target.value}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="available" className="block text-gray-700 font-semibold">Available</label>
          <input
            id="available"
            type="checkbox"
            checked={food.available}
            onChange={(e) => food.available = e.target.checked}
            className="w-5 h-5"
          />
        </div>

        {/* Image Preview */}
        {food.imageUrl && (
          <div className="mb-4">
            <img src={builder.image(food.imageUrl).url()} alt="Food Image" className="w-40 h-40 object-cover" />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Update Food
        </button>
      </form>
    </div>
  );
}
