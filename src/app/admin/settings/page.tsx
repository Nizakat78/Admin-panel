"use client";

import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Check for saved theme in localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle dark mode toggle
  const handleDarkModeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDarkMode(isChecked);

    if (isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Handle password change form
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
      alert("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Dark Mode Toggle Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appearance</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="h-5 w-5 text-blue-500"
            />
          </div>
        </div>

        {/* Update Password Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}

            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Password
              </button>
            </div>
          </form>
        </div>

        {/* Admin Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Admin Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="adminName">
                Admin Name
              </label>
              <input
                type="text"
                id="adminName"
                value="John Doe" // Replace with actual value or fetch dynamically
                onChange={() => {}}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="adminEmail">
                Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                value="admin@example.com" // Replace with actual value or fetch dynamically
                onChange={() => {}}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Receive Email Notifications</span>
              <input type="checkbox" className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Receive SMS Notifications</span>
              <input type="checkbox" className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Enable Push Notifications</span>
              <input type="checkbox" className="h-5 w-5 text-blue-500" />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* General Settings Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Enable Auto Updates</span>
              <input type="checkbox" className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Language</span>
              <select className="h-10 px-3 border border-gray-300 rounded-md text-gray-700">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
