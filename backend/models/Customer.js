const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        name: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);
