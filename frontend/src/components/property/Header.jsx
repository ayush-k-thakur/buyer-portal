import { LogOut, Home, Heart, Plus, Logs } from "lucide-react";
import { buildUrl } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header({ user, activeTab, setActiveTab }) {
  const { fetchMe, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      navigate("/auth");
    }
  };

  return (
    <div className="mb-10 px-4 sm:px-6 lg:px-10">
      {/* Top Navbar */}
      <header className="bg-white border border-emerald-200 shadow-sm rounded-xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Real Estate Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1 sm:mt-0">
            Welcome back, <span className="font-medium">{user.name}</span> <span> ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})</span>
          </p>
        </div>

        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      {/* Tabs */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl shadow-inner overflow-x-auto flex-nowrap snap-x snap-mandatory">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer snap-start ${activeTab === "all" ? "bg-white shadow text-emerald-600" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Home size={16} />
            All Properties
          </button>

          <button
            onClick={() => setActiveTab("favourites")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer snap-start ${activeTab === "favourites" ? "bg-white shadow text-red-500" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <Heart size={16} />
            My Favourites
          </button>

          {(user.role === "admin" || user.role === "seller") && (
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer snap-start ${activeTab === "add" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Plus size={16} />
              Add Property
            </button>
          )}

          {user.role === "seller" && (
            <button
              onClick={() => setActiveTab("my-listings")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer snap-start ${activeTab === "my-listings" ? "bg-white shadow text-yellow-600" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Logs size={16} />
              My Listings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}