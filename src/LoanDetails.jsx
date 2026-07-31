import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./services/api";

function LoanDetails() {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);

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

    if (!loan) {
        return <h2 className="p-6 text-xl font-semibold">No Loan Data found</h2>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-5">
                Loan Details
            </h1>

            <div className="border p-5 rounded-lg bg-white shadow">
                <p className="mb-2">
                    <b>Customer Name:</b> {loan.customerName}
                </p>

                <p className="mb-2">
                    <b>Loan Amount:</b> ₹{loan.loanAmount}
                </p>

                <p className="mb-2">
                    <b>Property Value:</b> ₹{loan.propertyValue}
                </p>

                <p className="mb-2">
                    <b>Annual Income:</b> ₹{loan.annualIncome}
                </p>

                <p className="mb-2">
                    <b>Loan Tenure:</b> {loan.loanTenure} Years
                </p>

                <p className="mb-2">
                    <b>Status:</b> {loan.status}
                </p>

                <p className="mb-2">
                    <b>Interest Rate:</b> {loan.interestRate}%
                </p>
            </div>
        </div>
    );
}

export default LoanDetails;