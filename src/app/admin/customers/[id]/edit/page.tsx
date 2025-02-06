// src/app/admin/customers/[id]/edit/page.tsx

"use client";

import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter, usePathname } from "next/navigation";
import { useParams } from 'next/navigation';

const CustomerEditPage = () => {
  const { id } = useParams(); // Access dynamic `id` from the URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customer, setCustomer] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      // Replace this with an actual API call to fetch customer data by ID
      const fetchedCustomer = { id, name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Active" };
      setCustomer(fetchedCustomer);
      setName(fetchedCustomer.name);
      setEmail(fetchedCustomer.email);
      setPhone(fetchedCustomer.phone);
      setStatus(fetchedCustomer.status);
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const handleSave = () => {
    // Handle save logic (API call to save edited data)
    alert("Customer details updated!");
    router.push("/admin/customers"); // Redirect back to customers list page
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Customer</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CustomerEditPage;
