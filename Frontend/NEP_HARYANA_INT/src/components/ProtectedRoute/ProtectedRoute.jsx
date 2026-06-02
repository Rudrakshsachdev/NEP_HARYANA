import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getDashboardPathForUser } from "../../api/auth";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "radial-gradient(circle at top left, #0f172a, #020617)",
        color: "#f8fafc",
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(255, 255, 255, 0.1)",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ letterSpacing: "0.05em", fontWeight: 500 }}>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const correctDashboard = getDashboardPathForUser(user);
    return <Navigate to={correctDashboard} replace />;
  }

  return children;
}

export function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    const correctDashboard = getDashboardPathForUser(user);
    return <Navigate to={correctDashboard} replace />;
  }

  return children;
}

