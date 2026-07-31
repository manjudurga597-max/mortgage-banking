import { useEffect, useState, useCallback } from "react";
import api from "./services/api";

function LoanApproval() {
    const [loans, setLoans] = useState([]);

    const loadLoans = useCallback(async () => {
        try {
            const response = await api.get("/loans");
            setLoans(response.data);
        } catch (error) {
            console.error("Fetch Loans Error:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadLoans();
    }, [loadLoans]);

    const approveLoan = async (id) => {
        try {
            await api.put(`/loan/approve/${id}`);
            alert("Loan Approved Successfully");
            loadLoans();
        } catch (error) {
            console.error("Approve Loan Error:", error);
            alert(error.message || "Approve Loan Failed");
        }
    };

    const rejectLoan = async (id) => {
        try {
            await api.put(`/loan/reject/${id}`);
            alert("Loan Rejected Successfully");
            loadLoans();
        } catch (error) {
            console.error("Reject Loan Error:", error);
            alert(error.message || "Reject Loan Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Loan Approval
                </h1>

                <p className="text-gray-500 mb-6">
                    Review and approve customer loan applications
                </p>

                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Loan Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
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
                                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold"
                                                : loan.status === "Rejected"
                                                ? "bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold"
                                                : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold"
                                        }
                                    >
                                        {loan.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={() => approveLoan(loan._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => rejectLoan(loan._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Reject
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

export default LoanApproval;