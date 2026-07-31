require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/errorHandler.js");

const authRoutes = require("./routes/authRoutes.js");
const customerRoutes = require("./routes/customerRoutes.js");
const loanRoutes = require("./routes/loanRoutes.js");
const documentRoutes = require("./routes/documentRoutes.js");

const app = express();

// Connect to Database & Bootstrap Admin
connectDB();

// CORS Configuration
const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root healthcheck route
app.get("/", (req, res) => {
    res.send("Mortgage Banking Backend Running...");
});

// API Routes
app.use("/", authRoutes);
app.use("/", customerRoutes);
app.use("/", loanRoutes);
app.use("/", documentRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});