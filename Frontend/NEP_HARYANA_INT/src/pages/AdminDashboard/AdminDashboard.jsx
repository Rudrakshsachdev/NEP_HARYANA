import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import layoutStyles from "../Dashboard/Dashboard.module.css";
import pageStyles from "./AdminDashboard.module.css";
import AdminSidebar from "../../components/admin/layout/AdminSidebar";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import OverviewSection from "./sections/OverviewSection";
import ApplicationsSection from "./sections/ApplicationsSection";
import InstitutionsSection from "./sections/InstitutionsSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import Footer from "../../components/admin/Footer";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  fetchAdminAnalytics,
  fetchAdminApplications,
  fetchAdminDashboardStats,
  fetchAdminInstitutions,
} from "../../api/admin";

function formatRole(role) {
  if (role === "admin") return "DHE Admin";
  if (role === "principal") return "College Principal";
  if (role === "committee") return "Screening Committee";
  return "Administrator";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const [loading, setLoading] = useState({
    overview: true,
    applications: true,
    institutions: true,
    analytics: true,
  });
  const [errors, setErrors] = useState({
    overview: null,
    applications: null,
    institutions: null,
    analytics: null,
  });

  const { user: savedUser, logout } = useAuth();
  const officerName = savedUser?.full_name || "Admin";
  const officerRole = formatRole(savedUser?.role);
  const departmentName = savedUser?.college_name || "Higher Education Department";
  const zoneCode = savedUser?.aishe_code || "DHE-HR";

  const loadOverview = useCallback(async () => {
    setLoading((prev) => ({ ...prev, overview: true }));
    setErrors((prev) => ({ ...prev, overview: null }));
    try {
      const [statsData, analyticsData, appsData] = await Promise.all([
        fetchAdminDashboardStats(),
        fetchAdminAnalytics(),
        fetchAdminApplications(),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
      setApplications(appsData.applications || []);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        overview: err.message || "Failed to load dashboard data.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, overview: false }));
    }
  }, []);

  const loadApplications = useCallback(async () => {
    setLoading((prev) => ({ ...prev, applications: true }));
    setErrors((prev) => ({ ...prev, applications: null }));
    try {
      const data = await fetchAdminApplications();
      setApplications(data.applications || []);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        applications: err.message || "Failed to load applications.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, applications: false }));
    }
  }, []);

  const loadInstitutions = useCallback(async () => {
    setLoading((prev) => ({ ...prev, institutions: true }));
    setErrors((prev) => ({ ...prev, institutions: null }));
    try {
      const data = await fetchAdminInstitutions();
      setInstitutions(data.institutions || []);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        institutions: err.message || "Failed to load institutions.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, institutions: false }));
    }
  }, []);

  const loadAnalytics = useCallback(async () => {
    setLoading((prev) => ({ ...prev, analytics: true }));
    setErrors((prev) => ({ ...prev, analytics: null }));
    try {
      const [statsData, analyticsData] = await Promise.all([
        fetchAdminDashboardStats(),
        fetchAdminAnalytics(),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        analytics: err.message || "Failed to load analytics.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, analytics: false }));
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    if (activeSection === "applications") {
      loadApplications();
    }
  }, [activeSection, loadApplications]);

  useEffect(() => {
    if (activeSection === "institutions") {
      loadInstitutions();
    }
  }, [activeSection, loadInstitutions]);

  useEffect(() => {
    if (activeSection === "analytics") {
      loadAnalytics();
    }
  }, [activeSection, loadAnalytics]);

  const handleLogout = async () => {
    await logout();
    setShowProfileDropdown(false);
    navigate("/auth/login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "applications":
        return (
          <ApplicationsSection
            applications={applications}
            loading={loading.applications}
            error={errors.applications}
          />
        );
      case "institutions":
        return (
          <InstitutionsSection
            institutions={institutions}
            loading={loading.institutions}
            error={errors.institutions}
          />
        );
      case "analytics":
        return (
          <AnalyticsSection
            analytics={analytics}
            stats={stats}
            loading={loading.analytics}
            error={errors.analytics}
          />
        );
      default:
        return (
          <OverviewSection
            stats={stats}
            analytics={analytics}
            applications={applications}
            loading={loading.overview}
            error={errors.overview}
          />
        );
    }
  };

  return (
    <div className={layoutStyles.dashboardLayout}>
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        departmentName={departmentName}
        zoneCode={zoneCode}
      />

      <div className={layoutStyles.mainContent}>
        <AdminHeader
          activeSection={activeSection}
          officerName={officerName}
          officerRole={officerRole}
          showProfileDropdown={showProfileDropdown}
          onToggleProfile={() => setShowProfileDropdown((v) => !v)}
          onLogout={handleLogout}
        />

        <main className={pageStyles.pageContent}>{renderSection()}</main>
        <Footer />
      </div>
    </div>
  );
}
