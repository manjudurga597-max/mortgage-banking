const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    // Migration fallback: support legacy plaintext passwords and automatically upgrade them to bcrypt
    if (enteredPassword === this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(enteredPassword, salt);
        await this.save();
        return true;
    }

    return false;
};

module.exports = mongoose.model("User", userSchema);
