// src/app/admin/products/page.tsx

"use client"; // This marks the file as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for router in Next.js 13+
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons for edit and delete

const ProductsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]); // State to hold the list of products
  const router = useRouter();

  // Fetch the products data (replace with actual API call)
  useEffect(() => {
    const fetchProducts = async () => {
      // Example of mocked products data (replace this with actual API call)
      const productsData = [
        {
          id: "1",
          name: "Product 1",
          description: "This is the description of product 1",
          price: "$50.00",
          stock: 100,
        },
        {
          id: "2",
          name: "Product 2",
          description: "This is the description of product 2",
          price: "$120.00",
          stock: 50,
        },
        {
          id: "3",
          name: "Product 3",
          description: "This is the description of product 3",
          price: "$30.00",
          stock: 200,
        },
      ];
      setProducts(productsData);
    };

    fetchProducts();
  }, []); // Fetch the products when the component is mounted

  // Handle product edit
  const handleEdit = (productId: string) => {
    router.push(`/admin/products/${productId}/edit`); // Redirect to product edit page
  };

  // Handle product delete
  const handleDelete = (productId: string) => {
    // Confirm before deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      // Here you would call an API to delete the product
      setProducts(products.filter((product) => product.id !== productId)); // Mock delete by removing from the list
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Products</h1>

      {/* Add New Product Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/products/add")} // Navigate to add new product page
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add New Product
        </button>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 flex space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product.id)}
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

export default ProductsPage;
