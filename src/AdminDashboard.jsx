import { useEffect, useState } from "react";
import api from "./services/api";

function AdminDashboard() {
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        api.get("/customers")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Fetch Customers Error:", error);
            });

        api.get("/loans")
            .then((response) => {
                setLoans(response.data);
            })
            .catch((error) => {
                console.error("Fetch Loans Error:", error);
            });
    }, []);

    const approvedLoans = loans.filter((loan) => loan.status === "Approved");
    const pendingLoans = loans.filter((loan) => loan.status === "Pending");
    const rejectedLoans = loans.filter((loan) => loan.status === "Rejected");

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-2">
                Admin Dashboard
            </h1>

            <p className="text-gray-500 mb-8">
                Banking Management Overview
            </p>

            <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
                    <h2 className="text-gray-500 font-semibold">
                        Total Customers
                    </h2>

                    <p className="text-4xl font-bold text-blue-600">
                        {customers.length}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-600">
                    <h2 className="text-gray-500 font-semibold">
                        Total Loans
                    </h2>

                    <p className="text-4xl font-bold text-purple-600">
                        {loans.length}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-600">
                    <h2 className="text-gray-500 font-semibold">
                        Approved Loans
                    </h2>

                    <p className="text-4xl font-bold text-green-600">
                        {approvedLoans.length}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">
                    <h2 className="text-gray-500 font-semibold">
                        Pending Loans
                    </h2>

                    <p className="text-4xl font-bold text-yellow-500">
                        {pendingLoans.length}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-600">
                    <h2 className="text-gray-500 font-semibold">
                        Rejected Loans
                    </h2>

                    <p className="text-4xl font-bold text-red-600">
                        {rejectedLoans.length}
                    </p>
                </div>
            </div>

            <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                    Recent Loan Applications
                </h2>

                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loans.slice(0, 5).map((loan) => (
                            <tr key={loan._id} className="border-b">
                                <td className="p-3">{loan.customerName}</td>
                                <td className="p-3">₹ {loan.loanAmount}</td>
                                <td className="p-3 font-bold">{loan.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;