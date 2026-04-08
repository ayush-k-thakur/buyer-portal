import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import PropertySkeleton from './utils/PropertySkeleton';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col p-4">
        <PropertySkeleton />
      </div>
    )
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      {user ? <Dashboard /> : <AuthPage />}
    </>
  )
}

export default App
