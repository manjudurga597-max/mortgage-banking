const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true
        },
        loanAmount: {
            type: Number,
            required: [true, "Loan amount is required"],
            min: [0, "Loan amount must be a positive number"]
        },
        propertyValue: {
            type: Number,
            required: [true, "Property value is required"],
            min: [0, "Property value must be a positive number"]
        },
        annualIncome: {
            type: Number,
            required: [true, "Annual income is required"],
            min: [0, "Annual income must be a positive number"]
        },
        loanTenure: {
            type: Number,
            required: [true, "Loan tenure is required"],
            min: [1, "Loan tenure must be at least 1 year"]
        },
        interestRate: {
            type: Number,
            required: [true, "Interest rate is required"],
            min: [0, "Interest rate must be a positive number"]
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Loan", loanSchema);
