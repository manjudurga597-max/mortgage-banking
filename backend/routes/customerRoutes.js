const express = require("express");
const router = express.Router();
const {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/customer", protect, createCustomer);
router.get("/customers", protect, getCustomers);
router.put("/customer/:id", protect, updateCustomer);
router.delete("/customer/:id", protect, deleteCustomer);

module.exports = router;
