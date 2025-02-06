// src/app/admin/customers/page.tsx

"use client"; // This marks the file as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CustomerPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customers, setCustomers] = useState<any[]>([]); // State to store customer data
  const router = useRouter();

  // Fetch customer data (mocked here for example)
  useEffect(() => {
    // Replace this with an actual API call to fetch customers
    const fetchCustomers = async () => {
      const fetchedCustomers = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", status: "Inactive" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-789-0123", status: "Active" },
      ];
      setCustomers(fetchedCustomers);
    };

    fetchCustomers();
  }, []);

  // Handle view details
  const handleViewDetails = (id: number) => {
    router.push(`/admin/customers/${id}`);
  };

  // Handle edit customer
  const handleEditCustomer = (id: number) => {
    router.push(`/admin/customers/${id}/edit`);
  };

  // Handle delete customer
  const handleDeleteCustomer = (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      // Replace this with an API call to delete the customer
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Customers</h1>

      {/* Customer Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Phone</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-200">
                <td className="py-4 px-6 text-sm text-gray-800">{customer.name}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{customer.email}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{customer.phone}</td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  <span className={`px-3 py-1 rounded-full text-sm ${customer.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  <button
                    onClick={() => handleViewDetails(customer.id)}
                    className="text-blue-600 hover:text-blue-700 mr-3"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEditCustomer(customer.id)}
                    className="text-yellow-500 hover:text-yellow-600 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;
