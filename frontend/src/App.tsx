import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BriefcaseBusiness, CircleDollarSign, Gavel, LayoutDashboard, UsersRound } from "lucide-react";
import { ToastProvider } from './components/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Dashboard } from './components/dashboard/Dashboard';
import { JobForm } from './components/JobForm';
import { useAuth } from './components/auth/AuthContext';
import { SessionTimeout } from './components/auth/SessionTimeout';
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { EmailVerification } from './components/auth/EmailVerification';
import { Home } from './pages/Home';
import { Artisans } from './pages/Artisans';

type NavItem = "dashboard" | "jobs" | "artisans" | "settlements" | "disputes";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function MainLayout() {
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [showJobForm, setShowJobForm] = useState(false);

  const handleCloseJobForm = () => {
    setShowJobForm(false);
  };

  const handleJobSuccess = (jobId: string) => {
    console.log('Job created successfully:', jobId);
    setShowJobForm(false);
  };

  return (
    <main className="shell">
      <SessionTimeout />
      <aside className="sidebar bg-gradient-to-b from-blue-900 to-blue-800 shadow-lg" aria-label="ArtisanHub navigation">
        <div className="brand-mark bg-gradient-to-br from-blue-600 to-blue-400 border-2 border-blue-300">
          <span className="text-white font-bold">AH</span>
        </div>
        <nav className="rail" aria-label="Primary navigation">
          <button
            className={`rail-button ${activeNav === "dashboard" ? "active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" : "text-blue-200 hover:text-white hover:bg-blue-700"}`}
            onClick={() => setActiveNav("dashboard")}
            aria-label="Dashboard"
            aria-current={activeNav === "dashboard" ? "page" : undefined}
          >
            <LayoutDashboard size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "jobs" ? "active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" : "text-blue-200 hover:text-white hover:bg-blue-700"}`}
            onClick={() => setActiveNav("jobs")}
            aria-label="Jobs"
            aria-current={activeNav === "jobs" ? "page" : undefined}
          >
            <BriefcaseBusiness size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "artisans" ? "active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" : "text-blue-200 hover:text-white hover:bg-blue-700"}`}
            onClick={() => setActiveNav("artisans")}
            aria-label="Artisans"
            aria-current={activeNav === "artisans" ? "page" : undefined}
          >
            <UsersRound size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "settlements" ? "active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" : "text-blue-200 hover:text-white hover:bg-blue-700"}`}
            onClick={() => setActiveNav("settlements")}
            aria-label="Settlements"
            aria-current={activeNav === "settlements" ? "page" : undefined}
          >
            <CircleDollarSign size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "disputes" ? "active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" : "text-blue-200 hover:text-white hover:bg-blue-700"}`}
            onClick={() => setActiveNav("disputes")}
            aria-label="Disputes"
            aria-current={activeNav === "disputes" ? "page" : undefined}
          >
            <Gavel size={20} />
          </button>
        </nav>
      </aside>

      <section className="workspace bg-gradient-to-b from-blue-50 to-white">
        {activeNav === "dashboard" && <Dashboard onCreateJob={() => setShowJobForm(true)} />}
        {activeNav === "artisans" && <Artisans />}
        {activeNav === "jobs" && (
          <div className="placeholder-page" aria-label="jobs page">
            <p className="eyebrow text-blue-600">section</p>
            <h1 className="text-gray-900">jobs</h1>
            <p style={{ color: "#64748B", marginTop: "12px" }} className="text-gray-600">
              This section is under construction.
            </p>
          </div>
        )}
        {activeNav === "settlements" && (
          <div className="placeholder-page" aria-label="settlements page">
            <p className="eyebrow text-blue-600">section</p>
            <h1 className="text-gray-900">settlements</h1>
            <p style={{ color: "#64748B", marginTop: "12px" }} className="text-gray-600">
              This section is under construction.
            </p>
          </div>
        )}
        {activeNav === "disputes" && (
          <div className="placeholder-page" aria-label="disputes page">
            <p className="eyebrow text-blue-600">section</p>
            <h1 className="text-gray-900">disputes</h1>
            <p style={{ color: "#64748B", marginTop: "12px" }} className="text-gray-600">
              This section is under construction.
            </p>
          </div>
        )}
      </section>

      {showJobForm && (
        <div className="modal-overlay bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Create new job">
          <div className="modal-body bg-white rounded-2xl shadow-2xl">
            <JobForm onCancel={handleCloseJobForm} onSuccess={handleJobSuccess} />
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
