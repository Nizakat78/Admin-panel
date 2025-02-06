// src/app/admin/customers/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // Import useParams
import { useRouter } from "next/navigation";

const CustomerViewPage = () => {
  const { id } = useParams(); // Access dynamic `id` from the URL using useParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customer, setCustomer] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the customer data based on ID
    const fetchCustomer = async () => {
      // Replace with an actual API call to fetch customer data by ID
      const fetchedCustomer = { id, name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Active" };
      setCustomer(fetchedCustomer);
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">View Customer</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Name: </strong>
          <span>{customer.name}</span>
        </div>
        <div className="mb-4">
          <strong>Email: </strong>
          <span>{customer.email}</span>
        </div>
        <div className="mb-4">
          <strong>Phone: </strong>
          <span>{customer.phone}</span>
        </div>
        <div className="mb-4">
          <strong>Status: </strong>
          <span>{customer.status}</span>
        </div>

        <button
          onClick={() => router.push(`/admin/customers/${id}/edit`)}
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CustomerViewPage;
