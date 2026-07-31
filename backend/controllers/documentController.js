const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");

const uploadDocument = async (req, res, next) => {
    try {
        console.log("POST /upload called");
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { customerName, documentName } = req.body;
        if (!customerName || !documentName) {
            return res.status(400).json({
                message: "Customer name and document name are required"
            });
        }

        const document = await Document.create({
            customerName,
            documentName,
            fileName: req.file.filename
        });

        res.status(201).json({
            message: "File Uploaded Successfully",
            document
        });
    } catch (error) {
        next(error);
    }
};

const createDocumentRecord = async (req, res, next) => {
    try {
        const { customerName, documentName, fileName } = req.body;
        if (!customerName || !documentName || !fileName) {
            return res.status(400).json({
                message: "Customer name, document name, and file name are required"
            });
        }

        const document = await Document.create(req.body);
        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

const getDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find().sort({ uploadedDate: -1 });
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

const deleteDocument = async (req, res, next) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (doc.fileName) {
            const filePath = path.join(__dirname, "../uploads", doc.fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Document.findByIdAndDelete(req.params.id);

        res.json({
            message: "Document Deleted Successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadDocument,
    createDocumentRecord,
    getDocuments,
    deleteDocument
};
