"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg"; // Profile icon
import Link from "next/link"; // Import Link component

const Dashboard = () => {
  const [adminName, setAdminName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/"); // Redirect to login if no token is found
    } else {
      setAdminName(process.env.NEXT_PUBLIC_ADMIN_NAME || "Admin");
    }
  }, [router]);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/"); // Redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold text-center mb-20">Food Tuck Restaurant</h2>
        <ul className="space-y-10">
          <li><Link href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded-md">Dashboard</Link></li>
          <li><Link href="/admin/orders" className="hover:bg-gray-700 p-2 rounded-md">Orders</Link></li>
          <li><Link href="/admin/products" className="hover:bg-gray-700 p-2 rounded-md">Products</Link></li>
          <li><Link href="/admin/customers" className="hover:bg-gray-700 p-2 rounded-md">Customers</Link></li>
          <li><Link href="/admin/settings" className="hover:bg-gray-700 p-2 rounded-md">Settings</Link></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
          <div className="flex items-center space-x-4">
            {adminName ? (
              <>
                <span className="text-lg">{adminName}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => router.push("/")} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400">
                <CgProfile />
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Orders */}
          <div className="bg-white shadow-lg rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Orders</h3>
            <div className="text-4xl text-blue-600">124</div>
          </div>

          {/* Card 2: Total Products */}
          <div className="bg-white shadow-lg rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Products</h3>
            <div className="text-4xl text-green-600">50</div>
          </div>

          {/* Card 3: Total Customers */}
          <div className="bg-white shadow-lg rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Customers</h3>
            <div className="text-4xl text-purple-600">210</div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white shadow-lg rounded-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-gray-700">New Order Received</span>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Product Stock Updated</span>
              <span className="text-sm text-gray-500">10 minutes ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Customer Account Created</span>
              <span className="text-sm text-gray-500">30 minutes ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
