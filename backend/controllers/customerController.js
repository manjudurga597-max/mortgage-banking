const Customer = require("../models/Customer");

const createCustomer = async (req, res, next) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                message: "Customer name and phone are required"
            });
        }

        const lastCustomer = await Customer.findOne().sort({ customerId: -1 });

        let nextNumber = 1;
        if (lastCustomer && lastCustomer.customerId) {
            const lastNumber = parseInt(
                lastCustomer.customerId.replace("CUST", ""),
                10
            );
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        const customer = await Customer.create({
            customerId: "CUST" + String(nextNumber).padStart(3, "0"),
            name,
            phone
        });

        console.log("Customer Created:", customer);
        res.status(201).json(customer);
    } catch (error) {
        next(error);
    }
};

const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.json(customers);
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json(customer);
    } catch (error) {
        next(error);
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json({
            message: "Customer Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
};
