// src/app/admin/orders/page.tsx

"use client"; // Marks this as a client-side component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for navigation in Next.js 13+
import { client } from "../../../sanity/lib/sanityClient"; // Import Sanity client

const OrdersPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]); // List of orders
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering
  const router = useRouter();

  // Fetch orders data from Sanity
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await client.fetch(
          `*[_type == "order"] {
            _id,
            userId,
            items[] {
              name,
              price,
              quantity,
              image
            },
            shippingDetails {
              firstName,
              lastName,
              email,
              phone,
              country,
              city,
              zipCode
            },
            total,
            status,
            createdAt
          }`
        );
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle search functionality
  const filteredOrders = orders.filter((order) => {
    // Make sure shippingDetails exists before accessing its properties
    const shippingDetails = order.shippingDetails || {};
    const fullName = `${shippingDetails.firstName || ''} ${shippingDetails.lastName || ''}`.toLowerCase();

    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          className="px-4 py-2 w-1/3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">
                    {order.shippingDetails?.firstName} {order.shippingDetails?.lastName}
                  </td>
                  <td className="px-6 py-4">${order.total}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                      onClick={() => router.push(`/admin/orders/${order._id}`)} // Navigate to order details page
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
