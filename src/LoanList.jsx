import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api";
import { setLoans } from "./store/loanSlice";

function LoanList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const loans = useSelector((state) => state.loan.loans);

    const loadLoans = useCallback(async () => {
        try {
            const response = await api.get("/loans");
            dispatch(setLoans(response.data));
        } catch (error) {
            console.error("Fetch Loans Error:", error);
        }
    }, [dispatch]);

    const deleteLoan = async (id) => {
        try {
            await api.delete(`/loan/${id}`);
            alert("Loan Deleted Successfully");
            loadLoans();
        } catch (error) {
            console.error("Delete Loan Error:", error);
            alert(error.message || "Delete Loan Failed");
        }
    };

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

    useEffect(() => {
        loadLoans();
    }, [loadLoans]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-700">
                            Loan Applications
                        </h1>
                        <p className="text-gray-500">
                            Manage customer loan applications
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/loan-application")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
                    >
                        + New Loan
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search Customer"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3">Customer Name</th>
                                <th className="p-3">Loan Amount</th>
                                <th className="p-3">Property Value</th>
                                <th className="p-3">Annual Income</th>
                                <th className="p-3">Tenure</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loans
                                .filter((loan) =>
                                    loan.customerName
                                        ? loan.customerName
                                              .trim()
                                              .toLowerCase()
                                              .includes(search.trim().toLowerCase())
                                        : false
                                )
                                .map((loan) => (
                                    <tr
                                        key={loan._id}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="p-3 font-semibold">
                                            {loan.customerName}
                                        </td>

                                        <td className="p-3">
                                            ₹ {loan.loanAmount}
                                        </td>

                                        <td className="p-3">
                                            ₹ {loan.propertyValue}
                                        </td>

                                        <td className="p-3">
                                            ₹ {loan.annualIncome}
                                        </td>

                                        <td className="p-3">
                                            {loan.loanTenure} Years
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={
                                                    loan.status === "Approved"
                                                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"
                                                        : loan.status === "Rejected"
                                                        ? "bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold"
                                                        : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold"
                                                }
                                            >
                                                {loan.status}
                                            </span>
                                        </td>

                                        <td className="p-3 flex gap-2 flex-wrap">
                                            <button
                                                onClick={() => deleteLoan(loan._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                onClick={() => navigate(`/loan-edit/${loan._id}`)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => navigate(`/loan/${loan._id}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => approveLoan(loan._id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => rejectLoan(loan._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
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
        </div>
    );
}

export default LoanList;