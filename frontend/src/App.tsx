import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  BriefcaseBusiness,
  CircleDollarSign,
  Gavel,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import { ToastProvider } from './components/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Dashboard } from './components/dashboard/Dashboard';
import { JobForm } from './components/JobForm';
import { useAuth } from './components/auth/AuthContext';
import { SessionTimeout } from './components/auth/SessionTimeout';

// Auth Components (Will create these next)
import { AuthLayout } from './components/auth/AuthLayout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { EmailVerification } from './components/auth/EmailVerification';

type NavItem = "dashboard" | "jobs" | "artisans" | "settlements" | "disputes";

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Main Authenticated Layout (extracted from former AppContent)
function MainLayout() {
  const [activeNav, setActiveNav] = useState<NavItem>("dashboard");
  const [showJobForm, setShowJobForm] = useState(false);

  const handleCloseJobForm = () => {
    setShowJobForm(false);
  };

  const handleJobSuccess = (jobId: string) => {
    console.log('Job created successfully:', jobId);
    // TODO: Refresh dashboard data or show success toast
    setShowJobForm(false);
  };

  return (
    <main className="shell">
      <SessionTimeout />
      <aside className="sidebar" aria-label="ArtisanHub navigation">
        <div className="brand-mark">
          <span>AH</span>
        </div>
        <nav className="rail" aria-label="Primary navigation">
          <button
            className={`rail-button ${activeNav === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveNav("dashboard")}
            aria-label="Dashboard"
            aria-current={activeNav === "dashboard" ? "page" : undefined}
          >
            <LayoutDashboard size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "jobs" ? "active" : ""}`}
            onClick={() => setActiveNav("jobs")}
            aria-label="Jobs"
            aria-current={activeNav === "jobs" ? "page" : undefined}
          >
            <BriefcaseBusiness size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "artisans" ? "active" : ""}`}
            onClick={() => setActiveNav("artisans")}
            aria-label="Artisans"
            aria-current={activeNav === "artisans" ? "page" : undefined}
          >
            <UsersRound size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "settlements" ? "active" : ""}`}
            onClick={() => setActiveNav("settlements")}
            aria-label="Settlements"
            aria-current={activeNav === "settlements" ? "page" : undefined}
          >
            <CircleDollarSign size={20} />
          </button>
          <button
            className={`rail-button ${activeNav === "disputes" ? "active" : ""}`}
            onClick={() => setActiveNav("disputes")}
            aria-label="Disputes"
            aria-current={activeNav === "disputes" ? "page" : undefined}
          >
            <Gavel size={20} />
          </button>
        </nav>
      </aside>

      <section className="workspace">
        {activeNav === "dashboard" && <Dashboard onCreateJob={() => setShowJobForm(true)} />}
        {activeNav !== "dashboard" && (
          <div className="placeholder-page" aria-label={`${activeNav} page`}>
            <p className="eyebrow">{activeNav}</p>
            <h1>Coming soon</h1>
            <p style={{ color: "var(--muted)", marginTop: "12px" }}>
              This section is under construction.
            </p>
          </div>
        )}
      </section>

      {/* Job creation form modal */}
      {showJobForm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Create new job">
          <div className="modal-body">
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
          {/* Public Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
