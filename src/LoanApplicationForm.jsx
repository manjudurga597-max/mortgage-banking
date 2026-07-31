import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "./services/api";

function LoanApplicationForm() {
    const { id } = useParams();

    const [customerName, setCustomerName] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [annualIncome, setAnnualIncome] = useState("");
    const [loanTenure, setLoanTenure] = useState("");
    const [interestRate, setInterestRate] = useState("");

    useEffect(() => {
        if (id) {
            api.get(`/loan/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setCustomerName(response.data.customerName || "");
                    setLoanAmount(response.data.loanAmount || "");
                    setPropertyValue(response.data.propertyValue || "");
                    setAnnualIncome(response.data.annualIncome || "");
                    setLoanTenure(response.data.loanTenure || "");
                    setInterestRate(response.data.interestRate || "");
                })
                .catch((error) => {
                    console.error("Fetch Loan Details Error:", error);
                    alert(error.message || "Failed to load loan details");
                });
        }
    }, [id]);

    const handleSubmit = async () => {
        if (
            !customerName ||
            !loanAmount ||
            !propertyValue ||
            !annualIncome ||
            !loanTenure ||
            !interestRate
        ) {
            alert("Please fill all fields");
            return;
        }

        if (
            loanAmount <= 0 ||
            propertyValue <= 0 ||
            annualIncome <= 0 ||
            loanTenure <= 0 ||
            interestRate <= 0
        ) {
            alert("Values must be greater than 0");
            return;
        }

        try {
            const response = await api.post("/loan", {
                customerName,
                loanAmount: Number(loanAmount),
                propertyValue: Number(propertyValue),
                annualIncome: Number(annualIncome),
                loanTenure: Number(loanTenure),
                interestRate: Number(interestRate),
                status: "Pending"
            });

            console.log(response.data);
            alert("Loan Application Submitted Successfully!");

            setCustomerName("");
            setLoanAmount("");
            setPropertyValue("");
            setAnnualIncome("");
            setLoanTenure("");
            setInterestRate("");
        } catch (error) {
            console.error("Submit Loan Error:", error);
            alert(error.message || "Error while saving loan");
        }
    };

    const updateLoan = async () => {
        if (
            !customerName ||
            !loanAmount ||
            !propertyValue ||
            !annualIncome ||
            !loanTenure ||
            !interestRate
        ) {
            alert("Please fill all fields");
            return;
        }

        if (
            loanAmount <= 0 ||
            propertyValue <= 0 ||
            annualIncome <= 0 ||
            loanTenure <= 0 ||
            interestRate <= 0
        ) {
            alert("Values must be greater than 0");
            return;
        }

        try {
            await api.put(`/loan/${id}`, {
                customerName,
                loanAmount: Number(loanAmount),
                propertyValue: Number(propertyValue),
                annualIncome: Number(annualIncome),
                loanTenure: Number(loanTenure),
                interestRate: Number(interestRate)
            });

            alert("Loan Updated Successfully");
        } catch (error) {
            console.error("Update Loan Error:", error);
            alert(error.message || "Error while saving loan");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">
                    Loan Application Form
                </h1>

                <p className="text-gray-500 mb-8">
                    Apply for a new banking loan
                </p>

                <div className="grid gap-5">
                    <div>
                        <label className="font-semibold text-gray-700">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">
                            Loan Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Loan Amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">
                            Property Value
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Property Value"
                            value={propertyValue}
                            onChange={(e) => setPropertyValue(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">
                            Annual Income
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Annual Income"
                            value={annualIncome}
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">
                            Loan Tenure (Years)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Loan Tenure"
                            value={loanTenure}
                            onChange={(e) => setLoanTenure(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="font-semibold text-gray-700">
                            Interest Rate (%)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Interest Rate"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={id ? updateLoan : handleSubmit}
                    className="
                        w-full 
                        mt-8
                        bg-blue-600 
                        hover:bg-blue-700 
                        text-white 
                        font-bold 
                        py-3 
                        rounded-lg 
                        shadow-md
                        transition
                    "
                >
                    {id ? "Update Loan" : "Submit Loan"}
                </button>
            </div>
        </div>
    );
}

export default LoanApplicationForm;