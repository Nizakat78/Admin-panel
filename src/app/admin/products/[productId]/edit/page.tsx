// src/app/admin/products/[productId]/edit/page.tsx

"use client"; // This marks the file as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // For dynamic route parameter (productId)

const EditProductPage = () => {
  const { productId } = useParams(); // Get the dynamic productId from the URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const router = useRouter();

  // Fetch product data based on productId
  useEffect(() => {
    // Fetch product details based on productId (replace with actual API call)
    const fetchProduct = async () => {
      // Mocked product data for example purposes
      const fetchedProduct = {
        id: productId,
        name: `Product ${productId}`,
        description: `This is the description of product ${productId}`,
        price: "$100.00",
        stock: 50,
      };
      setProduct(fetchedProduct);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]); // This will run again if productId changes

  // Handle form submission to update product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you would send the updated product data to your server (API call)
    console.log("Updated Product:", product);

    // Redirect to products list after successful update
    router.push("/admin/products");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Product</h1>

      {/* Edit Product Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
