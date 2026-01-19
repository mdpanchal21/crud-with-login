import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const getRoleFromToken = (token) => {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.role;
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            alert(data.message);

            if (data.token) {
                localStorage.setItem("token", data.token);

                const role = getRoleFromToken(data.token);
                localStorage.setItem("role", role);
                if( role === "admin"){
                    navigate("/admin");
                }
                else{
                    navigate("/users");
                }
            }
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-80 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="text-sm text-center mt-4">
                    New user?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default LoginPage;
