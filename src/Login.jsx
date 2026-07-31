import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!userId) {
            alert("Please enter User ID");
            return;
        }

        if (!password) {
            alert("Please enter Password");
            return;
        }

        try {
            const response = await api.post("/login", {
                userId,
                password
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            alert(response.data.message || "Login Successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.message || "Invalid User ID or Password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="border p-6 rounded-lg shadow-lg bg-white w-96">
                <h1 className="text-3xl font-bold mb-5 text-center text-blue-700">
                    Login
                </h1>

                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="border p-2 w-full mb-3 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-3 rounded outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded font-bold transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;