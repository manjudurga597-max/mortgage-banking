import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./services/api";

function LoanEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loan, setLoan] = useState({
        customerName: "",
        loanAmount: "",
        propertyValue: "",
        annualIncome: "",
        loanTenure: ""
    });

    useEffect(() => {
        api.get(`/loan/${id}`)
            .then((response) => {
                console.log(response.data);
                setLoan(response.data);
            })
            .catch((error) => {
                console.error("Fetch Loan Error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value
        });
    };

    const updateLoan = async () => {
        try {
            await api.put(`/loan/${id}`, loan);
            alert("Loan Updated Successfully");
            navigate("/loan-list");
        } catch (error) {
            console.error("Update Loan Error:", error);
            alert(error.message || "Failed to update loan");
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Loan Edit</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Customer Name</label>
                    <input
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="customerName"
                        value={loan.customerName || ""}
                        onChange={handleChange}
                        placeholder="Customer Name"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Loan Amount</label>
                    <input
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="loanAmount"
                        type="number"
                        value={loan.loanAmount || ""}
                        onChange={handleChange}
                        placeholder="Loan Amount"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Property Value</label>
                    <input
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="propertyValue"
                        type="number"
                        value={loan.propertyValue || ""}
                        onChange={handleChange}
                        placeholder="Property Value"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Annual Income</label>
                    <input
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="annualIncome"
                        type="number"
                        value={loan.annualIncome || ""}
                        onChange={handleChange}
                        placeholder="Annual Income"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Loan Tenure (Years)</label>
                    <input
                        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="loanTenure"
                        type="number"
                        value={loan.loanTenure || ""}
                        onChange={handleChange}
                        placeholder="Loan Tenure"
                    />
                </div>

                <button
                    onClick={updateLoan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-4"
                >
                    Update Loan
                </button>
            </div>
        </div>
    );
}

export default LoanEdit;