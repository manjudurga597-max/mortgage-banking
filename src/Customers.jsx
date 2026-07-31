import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
import { ThemeContext } from "./ThemeContext";

function Customers() {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);

    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [customers, setCustomers] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchCustomers = useCallback(async () => {
        try {
            const response = await api.get("/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("GET CUSTOMERS ERROR:", error);
            alert(error.message || "Unable to load customers");
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCustomers();
    }, [fetchCustomers]);

    const addCustomer = async () => {
        if (!name || !phone) {
            alert("Please fill all fields");
            return;
        }

        if (phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }

        try {
            const response = await api.post("/customer", {
                name: name,
                phone: phone
            });

            alert("Customer Added Successfully");
            setCustomers((previousCustomers) => [
                ...previousCustomers,
                response.data
            ]);

            setName("");
            setPhone("");
        } catch (error) {
            console.error("ADD CUSTOMER ERROR:", error);
            alert(error.message || "Customer Add Failed");
        }
    };

    const editCustomer = (customer) => {
        setEditId(customer._id);
        setName(customer.name);
        setPhone(customer.phone);
    };

    const updateCustomer = async () => {
        if (!editId) {
            alert("Please select a customer to edit");
            return;
        }

        if (!name || !phone) {
            alert("Please fill all fields");
            return;
        }

        if (phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }

        try {
            const response = await api.put(`/customer/${editId}`, {
                name: name,
                phone: phone
            });

            alert("Customer Updated Successfully");
            setCustomers((previousCustomers) =>
                previousCustomers.map((customer) =>
                    customer._id === editId ? response.data : customer
                )
            );

            setName("");
            setPhone("");
            setEditId(null);
        } catch (error) {
            console.error("UPDATE CUSTOMER ERROR:", error);
            alert(error.message || "Customer Update Failed");
        }
    };

    const deleteCustomer = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/customer/${id}`);
            alert("Customer Deleted Successfully");
            setCustomers((previousCustomers) =>
                previousCustomers.filter((customer) => customer._id !== id)
            );
        } catch (error) {
            console.error("DELETE CUSTOMER ERROR:", error);
            alert(error.message || "Customer Delete Failed");
        }
    };

    return (
        <div
            className={
                darkMode
                    ? "min-h-screen bg-gray-900 text-white p-6"
                    : "min-h-screen bg-gray-100 text-black p-6"
            }
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-blue-600">
                        Customer Management
                    </h1>
                    <p className="text-gray-500">
                        Manage all banking customers
                    </p>
                </div>

                <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow-lg">
                    <h2 className="text-lg font-bold">
                        Total Customers
                    </h2>
                    <p className="text-3xl text-center">
                        {customers.length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg p-3 text-black"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        maxLength="10"
                        onChange={(e) => setPhone(e.target.value)}
                        className="border rounded-lg p-3 text-black"
                    />

                    <input
                        type="text"
                        placeholder="Search Customer"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg p-3 text-black"
                    />
                </div>

                <div className="mt-5 flex gap-4">
                    <button
                        onClick={addCustomer}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Add Customer
                    </button>

                    <button
                        onClick={updateCustomer}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        Update Customer
                    </button>

                    <button
                        onClick={() => {
                            setName("");
                            setPhone("");
                            setEditId(null);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Customer ID</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Phone Number</th>
                            <th className="p-3">View</th>
                            <th className="p-3">Edit</th>
                            <th className="p-3">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers
                            .filter(
                                (customer) =>
                                    customer.name &&
                                    customer.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                            )
                            .map((customer) => (
                                <tr
                                    key={customer._id}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-3 font-semibold text-black">
                                        {customer.customerId}
                                    </td>

                                    <td className="p-3 text-black">
                                        {customer.name}
                                    </td>

                                    <td className="p-3 text-black">
                                        {customer.phone}
                                    </td>

                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                navigate("/customer-details", {
                                                    state: customer
                                                })
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            View
                                        </button>
                                    </td>

                                    <td className="p-3">
                                        <button
                                            onClick={() => editCustomer(customer)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                deleteCustomer(customer._id)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;