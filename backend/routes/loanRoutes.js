const express = require("express");
const router = express.Router();
const {
    createLoan,
    getLoans,
    getLoanById,
    updateLoan,
    approveLoan,
    rejectLoan,
    deleteLoan
} = require("../controllers/loanController");
const { protect } = require("../middleware/authMiddleware");

router.post("/loan", protect, createLoan);
router.get("/loans", protect, getLoans);
router.get("/loan/:id", protect, getLoanById);
router.put("/loan/:id", protect, updateLoan);
router.put("/loan/approve/:id", protect, approveLoan);
router.put("/loan/reject/:id", protect, rejectLoan);
router.delete("/loan/:id", protect, deleteLoan);

module.exports = router;
