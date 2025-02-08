"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg"; // Profile icon
import Link from "next/link"; // Import Link component
import { client } from "../../../sanity/lib/sanityClient"; // Import the sanity client
import { Pie, Bar, Doughnut } from "react-chartjs-2"; // Import Pie, Bar, Doughnut chart components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalFood, setTotalFood] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/"); // Redirect to login if no token is found
    } else {
      setAdminName(process.env.NEXT_PUBLIC_ADMIN_NAME || "Admin");
    }

    const fetchTotalOrders = async () => {
      const ordersQuery = '*[_type == "order"]';
      const orders = await client.fetch(ordersQuery);
      setTotalOrders(orders.length);
    };

    const fetchTotalFood = async () => {
      const foodQuery = '*[_type == "food"]';
      const food = await client.fetch(foodQuery);
      setTotalFood(food.length);
    };

    const fetchTotalCustomers = async () => {
      const ordersQuery = `*[_type == "order"] { userId }`;
      const orders = await client.fetch(ordersQuery);
      const uniqueCustomers = new Set(orders.map((order: { userId: string }) => order.userId));
      setTotalCustomers(uniqueCustomers.size);
    };

    fetchTotalOrders();
    fetchTotalFood();
    fetchTotalCustomers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/"); // Redirect to login
  };

  const chartData = {
    labels: ["Total Orders", "Total Food Items", "Total Customers"],
    datasets: [
      {
        data: [totalOrders, totalFood, totalCustomers],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4372", "#2F8EDD", "#FFD740"],
      },
    ],
  };

  const barChartData = {
    labels: ["Total Orders", "Total Food Items", "Total Customers"],
    datasets: [
      {
        label: "Statistics",
        data: [totalOrders, totalFood, totalCustomers],
        backgroundColor: "#36A2EB",  // Blue bars
        borderRadius: 8,  // Rounded corners
      },
    ],
  };

  const doughnutData = {
    labels: ["Total Orders", "Total Food Items", "Total Customers"],
    datasets: [
      {
        data: [totalOrders, totalFood, totalCustomers],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4372", "#2F8EDD", "#FFD740"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold text-center mb-20">Food Tuck Restaurant</h2>
        <ul className="space-y-10">
          <li><Link href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded-md">Dashboard</Link></li>
          <li><Link href="/admin/orders" className="hover:bg-gray-700 p-2 rounded-md">Orders</Link></li>
          <li><Link href="/admin/products" className="hover:bg-gray-700 p-2 rounded-md">Foods</Link></li>
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
            <div className="text-4xl text-blue-600">{totalOrders}</div>
          </div>

          {/* Card 2: Total Food */}
          <div className="bg-white shadow-lg rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Food Items</h3>
            <div className="text-4xl text-green-600">{totalFood}</div>
          </div>

          {/* Card 3: Total Customers */}
          <div className="bg-white shadow-lg rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Total Customers</h3>
            <div className="text-4xl text-purple-600">{totalCustomers}</div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white shadow-lg rounded-md p-6 mb-8 flex justify-center items-center">
          <h3 className="text-xl font-semibold mb-4 w-full text-center">Overview - Orders, Food & Customers</h3>
          <div className="w-full max-w-[400px] h-[400px]">
            <Pie data={chartData} />
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white shadow-lg rounded-md p-6 mb-8 flex justify-center items-center">
          <h3 className="text-xl font-semibold mb-4 w-full text-center">Comparison of Orders, Food, and Customers</h3>
          <div className="w-full max-w-[600px] h-[400px]">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Doughnut Chart Section */}
        <div className="bg-white shadow-lg rounded-md p-6 mb-8 flex justify-center items-center">
          <h3 className="text-xl font-semibold mb-4 w-full text-center">Distribution of Orders, Food & Customers</h3>
          <div className="w-full max-w-[400px] h-[400px]">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
