"use client";
import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react';

const FoodList = () => {
  const [foods, setFoods] = useState<any[]>([]); // State to store fetched food items

  // Fetch food items when the component mounts
  useEffect(() => {
    const getFoods = async () => {
      const fetchedFoods = await fetchedFoods();
      setFoods(fetchedFoods);  // Set state to fetched food items
    };

    getFoods();
  }, []);

  // Function to delete a food item (by ID)
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this food item?");
    if (!confirmed) return;

    try {
      // Call Sanity API to delete the food item by its ID
      await client.delete(id);

      // Optimistically update the UI by removing the deleted item
      setFoods((prevFoods) => prevFoods.filter(food => food._id !== id));

      alert("Food item deleted successfully.");
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Error deleting food item.");
    }
  };

  return (
    <div>
      <h1>Food Menu</h1>
      <div>
        {foods.map((food) => (
          <div key={food._id} style={{ marginBottom: '20px' }}>
            <h2>{food.name}</h2>
            {food.image && (
              <img src={urlFor(food.image).width(300).url()} alt={food.name} />
            )}
            <p>{food.description}</p>
            <p><strong>Category:</strong> {food.category}</p>
            <p><strong>Price:</strong> ${food.price}</p>
            <button onClick={() => handleDelete(food._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
