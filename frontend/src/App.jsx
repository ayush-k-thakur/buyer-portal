import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import DashboardSkeleton from "./utils/DashboardSkeleton";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;