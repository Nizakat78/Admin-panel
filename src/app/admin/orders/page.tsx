// src/app/admin/orders/page.tsx

"use client"; // Marks this as a client-side component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for navigation in Next.js 13+

const OrdersPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]); // List of orders
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering
  const router = useRouter();

  // Mocked orders data (In real-world scenario, data can be fetched from an API)
  useEffect(() => {
    const fetchOrders = async () => {
      // Example of fetching data (replace with actual API call)
      setOrders([
        {
          id: "1",
          customerName: "John Doe",
          totalAmount: "$120.00",
          status: "Pending",
          date: "2025-02-05",
        },
        {
          id: "2",
          customerName: "Jane Smith",
          totalAmount: "$200.00",
          status: "Shipped",
          date: "2025-02-04",
        },
        {
          id: "3",
          customerName: "Sam Wilson",
          totalAmount: "$95.00",
          status: "Delivered",
          date: "2025-02-03",
        },
      ]);
    };

    fetchOrders();
  }, []);

  // Handle search functionality
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <tr key={order.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">{order.totalAmount}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                      onClick={() => router.push(`/admin/orders/${order.id}`)} // Navigate to order details page
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
