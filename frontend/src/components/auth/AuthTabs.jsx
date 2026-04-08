export default function AuthTabs({ activeTab, setActiveTab }) {
    const base =
        "w-1/2 py-2 rounded-lg text-sm font-semibold transition cursor-pointer";

    return (
        <div className="flex flex-col rounded-xl p-1 mb-6">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Real Estate Portal</h1>
                <p className="text-slate-500 text-sm">Find your dream property</p>
            </div>
            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-xl p-2">
                <button
                    onClick={() => setActiveTab("login")}
                    className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${activeTab === "login"
                        ? "bg-white shadow text-emerald-600"
                        : "text-slate-500"
                        }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setActiveTab("signup")}
                    className={`w-1/2 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${activeTab === "signup"
                        ? "bg-white shadow text-emerald-600"
                        : "text-slate-500"
                        }`}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}