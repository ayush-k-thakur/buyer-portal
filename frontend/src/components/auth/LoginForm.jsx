import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const { setUser } = useAuth();

    const [data, setData] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);

    const input =
        "w-full bg-white/60 backdrop-blur border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition";


    const handleChange = (e) =>
        setData((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            // --- Login request ---
            const res = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            console.log("Login successful:", data);
            toast.success("Logged in successfully");
            setUser(data.user);
        } catch (err) {
            console.error("Network or server error:", err);
            toast.error("Something went wrong. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm text-slate-600">Email Address</label>
                <input
                    name="email"
                    type="email"
                    className={input}
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>

            <div className="relative">
                <label className="text-sm text-slate-600">Password</label>
                <input
                    name="password"
                    type={show ? "text" : "password"}
                    className={input}
                    placeholder="Your password"
                    value={data.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-9 text-xs cursor-pointer"
                >
                    {!show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <button className="w-full bg-emerald-600 text-white py-2.5 rounded-xl mt-2 cursor-pointer">
                Sign In
            </button>
        </form>
    );
}