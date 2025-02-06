/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/orders/[orderId]/page.tsx

"use client"; // This marks the file as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for navigation in Next.js 13+
import { useParams } from "next/navigation"; // To get the dynamic route params

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get the dynamic orderId from the URL
  const [orderDetails, setOrderDetails] = useState<any | null>(null); // State to hold order details
  const router = useRouter();

  // Fetching order details (replace with actual API call)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Example of mocked order details data (Replace this with actual API call)
      const orderData = {
        id: orderId,
        customerName: "John Doe",
        totalAmount: "$120.00",
        status: "Pending",
        date: "2025-02-05",
        items: [
          { id: "1", name: "Product 1", quantity: 2, price: "$50.00" },
          { id: "2", name: "Product 2", quantity: 1, price: "$20.00" },
        ],
      };
      setOrderDetails(orderData);
    };

    fetchOrderDetails();
  }, [orderId]); // Fetch details when the component is mounted or the orderId changes

  // Go back to orders list
  const goBack = () => {
    router.push("/admin/orders"); // Navigate to the orders page
  };

  if (!orderDetails) {
    return <div>Loading...</div>; // Show loading if order details are not yet fetched
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Order Details</h1>

      {/* Back Button */}
      <button
        onClick={goBack}
        className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
      >
        &#8592; Back to Orders
      </button>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Order #{orderDetails.id}</h2>
        <p className="text-sm mb-2">Customer: {orderDetails.customerName}</p>
        <p className="text-sm mb-2">Order Date: {orderDetails.date}</p>
        <p className="text-sm mb-2">Total Amount: {orderDetails.totalAmount}</p>
        <p className="text-sm mb-2">Status: {orderDetails.status}</p>
      </div>

      {/* Ordered Items Table */}
      <h3 className="text-xl font-semibold mb-4">Ordered Items</h3>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Item Name</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item: any) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">
                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
