import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "./services/api";
import { setLoans } from "./store/loanSlice";
import { ThemeContext } from "./ThemeContext";

function Dashboard() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const loans = useSelector((state) => state.loan.loans);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        api.get("/loans")
            .then((response) => {
                dispatch(setLoans(response.data));
            })
            .catch((error) => {
                console.error("Fetch Loans Error:", error);
            });

        api.get("/customers")
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error("Fetch Customers Error:", error);
            });
    }, [dispatch]);

    return (
        <div
            className={
                darkMode
                    ? "p-6 min-h-screen bg-gray-900 text-white"
                    : "p-6 min-h-screen bg-white text-black"
            }
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Mortgage Banking Dashboard
                </h1>

                <button
                    onClick={toggleTheme}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <p className="mb-5">
                Welcome to the application.
            </p>

            <div className="grid grid-cols-3 gap-5">
                <div className="border rounded-lg p-5 shadow bg-blue-100 text-black">
                    <h2 className="font-bold">
                        Total Customers
                    </h2>
                    <h1 className="text-3xl">
                        {customers.length}
                    </h1>
                </div>

                <div className="border rounded-lg p-5 shadow bg-purple-100 text-black">
                    <h2 className="font-bold">
                        Total Loans
                    </h2>
                    <h1 className="text-3xl">
                        {loans.length}
                    </h1>
                </div>

                <div className="border rounded-lg p-5 shadow bg-green-100 text-black">
                    <h2 className="font-bold">
                        Approved Loans
                    </h2>
                    <h1 className="text-3xl">
                        {
                            loans.filter(
                                (loan) => loan.status === "Approved"
                            ).length
                        }
                    </h1>
                </div>

                <div className="border rounded-lg p-5 shadow bg-yellow-100 text-black">
                    <h2 className="font-bold">
                        Pending Loans
                    </h2>
                    <h1 className="text-3xl">
                        {
                            loans.filter(
                                (loan) => loan.status === "Pending"
                            ).length
                        }
                    </h1>
                </div>

                <div className="border rounded-lg p-5 shadow bg-red-100 text-black">
                    <h2 className="font-bold">
                        Rejected Loans
                    </h2>
                    <h1 className="text-3xl">
                        {
                            loans.filter(
                                (loan) => loan.status === "Rejected"
                            ).length
                        }
                    </h1>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">
                Recent Loan Applications
            </h2>

            <table className="w-full border">
                <thead className="bg-gray-200 text-black">
                    <tr>
                        <th className="border p-2">
                            Customer Name
                        </th>
                        <th className="border p-2">
                            Loan Amount
                        </th>
                        <th className="border p-2">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loans.slice(0, 5).map((loan) => (
                        <tr key={loan._id}>
                            <td className="border p-2">
                                {loan.customerName}
                            </td>

                            <td className="border p-2">
                                ₹{loan.loanAmount}
                            </td>

                            <td className="border p-2">
                                {loan.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;