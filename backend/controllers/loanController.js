const Loan = require("../models/Loan");

const createLoan = async (req, res, next) => {
    try {
        const {
            customerName,
            loanAmount,
            propertyValue,
            annualIncome,
            loanTenure,
            interestRate
        } = req.body;

        if (
            !customerName ||
            loanAmount === undefined ||
            propertyValue === undefined ||
            annualIncome === undefined ||
            loanTenure === undefined ||
            interestRate === undefined
        ) {
            return res.status(400).json({
                message: "Please fill in all required loan fields"
            });
        }

        const loan = await Loan.create({
            customerName,
            loanAmount: Number(loanAmount),
            propertyValue: Number(propertyValue),
            annualIncome: Number(annualIncome),
            loanTenure: Number(loanTenure),
            interestRate: Number(interestRate),
            status: req.body.status || "Pending"
        });

        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
};

const getLoans = async (req, res, next) => {
    try {
        const loans = await Loan.find().sort({ createdAt: -1 });
        res.json(loans);
    } catch (error) {
        next(error);
    }
};

const getLoanById = async (req, res, next) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

const updateLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

const approveLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findByIdAndUpdate(
            req.params.id,
            { status: "Approved" },
            { new: true }
        );
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

const rejectLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findByIdAndUpdate(
            req.params.id,
            { status: "Rejected" },
            { new: true }
        );
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.json(loan);
    } catch (error) {
        next(error);
    }
};

const deleteLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        res.json({
            message: "Loan Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLoan,
    getLoans,
    getLoanById,
    updateLoan,
    approveLoan,
    rejectLoan,
    deleteLoan
};
