import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { buildUrl } from "../../utils/api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const { setUser } = useAuth();

    const [data, setData] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const res = await fetch(buildUrl("/users/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || "Login failed");
                return;
            }

            toast.success("Logged in successfully");
            setUser(result.user);
        } catch (err) {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
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

            <button
                disabled={loading}
                className={`w-full py-2.5 rounded-xl mt-2 text-white transition
                ${loading
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"}`}
            >
                {loading ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
}