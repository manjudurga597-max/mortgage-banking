const express = require("express");
const router = express.Router();
const {
    uploadDocument,
    createDocumentRecord,
    getDocuments,
    deleteDocument
} = require("../controllers/documentController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("file"), uploadDocument);
router.post("/document", protect, createDocumentRecord);
router.get("/documents", protect, getDocuments);
router.delete("/document/:id", protect, deleteDocument);

module.exports = router;
