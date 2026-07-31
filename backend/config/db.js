const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

        await bootstrapAdmin();
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
};

const bootstrapAdmin = async () => {
    try {
        const adminUser = await User.findOne({ userId: "admin" });
        const salt = await bcrypt.genSalt(10);

        if (!adminUser) {
            const hashedPassword = await bcrypt.hash("admin123", salt);

            await User.create({
                userId: "admin",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Admin user bootstrapped successfully");
        } else if (
            !adminUser.password.startsWith("$2a$") &&
            !adminUser.password.startsWith("$2b$")
        ) {
            adminUser.password = await bcrypt.hash("admin123", salt);
            await adminUser.save();
            console.log("Existing admin user upgraded to bcrypt hash successfully");
        }
    } catch (error) {
        console.error("Admin bootstrap error:", error.message);
    }
};

module.exports = connectDB;
