const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true
        },
        documentName: {
            type: String,
            required: [true, "Document name is required"],
            trim: true
        },
        fileName: {
            type: String,
            required: [true, "File name is required"],
            trim: true
        },
        uploadedDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Document", documentSchema);
