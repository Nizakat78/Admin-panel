/* eslint-disable @next/next/no-html-link-for-pages */
// src/components/Navbar.tsx

"use client";  // This marks the Navbar as client-side
import { CgProfile } from "react-icons/cg"; // Profile icon
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Correct import for router in Next.js 13+

const Navbar = () => {
  const [adminName, setAdminName] = useState<string | null>(null);  // For admin name
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);  // Toggle for profile menu
  const router = useRouter();  // useRouter to navigate after logout

  // Check if user is logged in when the Navbar is mounted
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      // If the adminToken exists in localStorage, treat as logged in
      setAdminName(process.env.NEXT_PUBLIC_ADMIN_NAME || "Admin"); // Get admin's name from .env
    } else {
      setAdminName(null);  // If not logged in, set to null
    }
  }, []);  // This will run once when the component is mounted

  // Handle Logout
  const handleLogout = () => {
    setAdminName(null);  // Clear admin name state
    localStorage.removeItem("adminToken");  // Remove the token from localStorage
    setIsProfileMenuOpen(false);  // Close the profile menu
    router.push("/");  // Redirect to login page
  };

  // Toggle Profile Menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);  // Toggle the profile menu visibility
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <a href="/" className="text-white hover:text-gray-300">Food Tuck Restaurant Admin Panel</a>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          <a href="/admin/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
          <a href="/admin/orders" className="text-white hover:text-gray-300">Orders</a>
          <a href="/admin/products" className="text-white hover:text-gray-300">Foods</a>
          <a href="/admin/customers" className="text-white hover:text-gray-300">Customers</a>
          <a href="/admin/settings" className="text-white hover:text-gray-300">Settings</a>
        </div>

        {/* Admin Info (Mobile & Desktop) */}
        <div className="flex items-center space-x-4 relative">
          {adminName ? (
            <>
              {/* Profile Icon & Admin Info */}
              <button onClick={toggleProfileMenu} className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md text-white hover:bg-gray-600">
                <CgProfile />
                <span>{adminName}</span> {/* Show admin's name only */}
              </button>

              {/* Profile Menu (Hidden by default, toggled on click) */}
              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                  <div className="p-4">
                    <p className="text-sm">Welcome, {adminName}</p> {/* Display admin's name */}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => router.push("/")} // Redirect to login if not logged in
              className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-400"
            >
              <CgProfile />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
