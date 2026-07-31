import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Customers",
            path: "/customers"
        },
        {
            name: "Loan Application",
            path: "/loan-application"
        },
        {
            name: "Loan List",
            path: "/loan-list"
        },
        {
            name: "Loan Status",
            path: "/loan-status"
        },
        {
            name: "EMI Calculator",
            path: "/emi-calculator"
        },
        {
            name: "Document Upload",
            path: "/document-upload"
        },
        {
            name: "Loan Approval",
            path: "/loan-approval"
        },
        {
            name: "Admin Dashboard",
            path: "/admin-dashboard"
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
            <h2 className="text-2xl font-bold mb-8">
                Mortgage Banking
            </h2>

            <div className="space-y-3 flex-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`
                            w-full 
                            text-left 
                            px-4 
                            py-3 
                            rounded-lg 
                            transition 
                            duration-300
                            ${
                                location.pathname === item.path
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-700"
                            }
                        `}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

            <button
                onClick={handleLogout}
                className="
                    w-full
                    mt-auto
                    px-4
                    py-3
                    rounded-lg
                    bg-red-600
                    hover:bg-red-700
                    transition
                "
            >
                Logout
            </button>
        </div>
    );
}

export default Sidebar;