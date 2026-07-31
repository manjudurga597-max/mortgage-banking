import { useState, useEffect } from "react";
import api from "./services/api";

function LoanStatus() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        api.get("/loans")
            .then((response) => {
                console.log(response.data);
                setLoans(response.data);
            })
            .catch((error) => {
                console.error("Fetch Loans Error:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Loan Status
                </h1>

                <p className="text-gray-500 mb-6">
                    Check customer loan application status
                </p>

                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Loan Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan._id} className="border-b hover:bg-gray-100">
                                <td className="p-3 font-semibold">
                                    {loan.customerName}
                                </td>

                                <td className="p-3">
                                    ₹ {loan.loanAmount}
                                </td>

                                <td className="p-3">
                                    <span
                                        className={
                                            loan.status === "Approved"
                                                ? "bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold"
                                                : loan.status === "Rejected"
                                                ? "bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold"
                                                : "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold"
                                        }
                                    >
                                        {loan.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoanStatus;