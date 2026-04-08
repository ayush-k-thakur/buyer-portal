import { useState } from "react";
import AuthTabs from "../components/auth/AuthTabs";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const input =
    "w-full bg-white/60 backdrop-blur border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-gray-300 to-emerald-200 px-4">
      <div className="w-[520px] backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl px-10 py-6">
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "login" ? (
          <LoginForm />
        ) : (
          <SignupForm input={input} />
        )}
      </div>
    </div>
  );
}