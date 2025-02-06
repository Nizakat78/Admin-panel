// src/app/admin/customers/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CustomerDetailsPage = ({ params }: { params: { id: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customer, setCustomer] = useState<any | null>(null);
  const router = useRouter();
  const { id } = params; // Customer ID passed through URL

  // Fetch customer details (mocked here for example)
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      // Replace with an actual API call to fetch a customer's details
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Customer Details</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong className="text-gray-600">Name:</strong>
            <span>{customer.name}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Email:</strong>
            <span>{customer.email}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Phone:</strong>
            <span>{customer.phone}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Address:</strong>
            <span>{customer.address}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Status:</strong>
            <span className={`${customer.status === "Active" ? "text-green-600" : "text-red-600"}`}>
              {customer.status}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => router.push("/admin/customers")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Customers
          </button>

          <button
            onClick={() => router.push(`/admin/customers/${customer.id}/edit`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
