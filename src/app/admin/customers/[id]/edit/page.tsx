
// src/app/admin/customers/[id]/edit/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditCustomerPage = ({ params }: { params: { id: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customer, setCustomer] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { id } = params; // Customer ID passed through URL

  // Fetch customer details (mocked here for example)
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      // Replace this with an actual API call to fetch the customer's details
      const fetchedCustomer = {
        id: Number(id),
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Cityville",
        status: "Active",
      };

      setCustomer(fetchedCustomer);
    };

    fetchCustomerDetails();
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  // Handle form submission (mocked here for example)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);
    // Replace with an actual API call to update the customer details
    setTimeout(() => {
      alert("Customer updated successfully!");
      setIsSaving(false);
      router.push(`/admin/customers/${id}`); // Redirect to customer details page after edit
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Customer</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => router.push(`/admin/customers/${customer.id}`)}
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerPage;
