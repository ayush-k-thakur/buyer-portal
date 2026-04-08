import { useState } from "react";
import { toast } from "react-toastify";
import { buildUrl } from "../../utils/api";

export default function AddProperty() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        location: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const input =
        "w-full bg-white/60 backdrop-blur border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(buildUrl("/property"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    price: Number(formData.price),
                    location: formData.location,
                    description: formData.description
                })
            });

            if (!res.ok) throw new Error("Upload failed");

            setFormData({ name: "", price: "", location: "", description: "" });
            toast.success("Property uploaded successfully");
        } catch (err) {
            setMessage(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-200 w-full max-w-md m-auto">

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name */}
                <label className="flex flex-col text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        Title <span className="text-red-500">*</span>
                    </span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Title of the property"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={input}
                        />
                </label>

                {/* Price */}
                <label className="flex flex-col text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        Price <span className="text-red-500">*</span>
                    </span>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price in NRs"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className={input}
                        />
                </label>

                {/* Location */}
                <label className="flex flex-col text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        Location <span className="text-red-500">*</span>
                    </span>
                    <input
                        type="text"
                        name="location"
                        placeholder="City, State, etc."
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className={input}
                    />
                </label>

                {/* Description */}
                <label className="flex flex-col text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                        Description
                    </span>
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Additional details about the property"
                        onChange={handleChange}
                        rows={3}
                        className={input + " resize-none"}
                    />
                </label>

                {message && <p className="text-sm text-red-500">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50 cursor-pointer"
                >
                    {loading ? "Uploading..." : "Upload Property"}
                </button>
            </form>
        </div>
    );
}