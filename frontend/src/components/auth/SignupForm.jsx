import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { buildUrl } from "../../utils/api";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
    const { setUser } = useAuth();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "buyer",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const input =
    "w-full bg-white/60 backdrop-blur border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition";


    const handleChange = (e) =>
        setData((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword, role } = data;

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        // password strength 8 characters, 1 uppercase, 1 lowercase, 1 number
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
            toast.error(
                "Password must be at least 8 characters and include uppercase, lowercase, and a number"
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            // --- Signup request ---
            const res = await fetch(buildUrl("/users/register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, confirmPassword, role }),
                credentials: "include", // if backend sets cookie on signup
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Signup failed");
                return;
            }

            toast.success("Account created successfully");
            setUser(data.user); // store user in context
        } catch (err) {
            console.error("Network or server error:", err);
            toast.error("Something went wrong. Try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="text-sm text-slate-600">Full Name</label>
                <input
                    name="name"
                    type="text"
                    className={input}
                    placeholder="Your name"
                    value={data.name}
                    onChange={handleChange}
                />
            </div>

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
                    type={showPassword ? "text" : "password"}
                    className={input}
                    placeholder="Your password"
                    value={data.password}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-xs cursor-pointer"
                >
                    {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="relative">
                <label className="text-sm text-slate-600">Confirm Password</label>
                <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={input}
                    placeholder="Your confirm password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-xs cursor-pointer"
                >
                    {!showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div>
                <label className="text-sm text-slate-600 block mb-1">Role</label>
                <div className="flex gap-6 text-sm text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="buyer"
                            checked={data.role === "buyer"}
                            onChange={handleChange}
                            className="accent-emerald-600"
                        />
                        Buyer
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="seller"
                            checked={data.role === "seller"}
                            onChange={handleChange}
                            className="accent-emerald-600"
                        />
                        Seller
                    </label>
                </div>
            </div>

            <button className="w-full bg-emerald-600 text-white py-2.5 rounded-xl mt-2 cursor-pointer">
                Create Account
            </button>
        </form>
    );
}