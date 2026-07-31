const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "30d"
    });
};

const loginUser = async (req, res, next) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both User ID and Password"
            });
        }

        const cleanUserId = userId.trim();
        console.log("Login User ID:", cleanUserId);

        const user = await User.findOne({
            userId: { $regex: new RegExp(`^${cleanUserId}$`, "i") }
        });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            return res.json({
                success: true,
                message: "Login Successful",
                token: token,
                user: {
                    userId: user.userId,
                    role: user.role
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid User ID or Password"
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser
};
