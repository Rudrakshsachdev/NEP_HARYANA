import { request } from "./auth";

export function fetchAdminDashboardStats() {
  return request("/admin/dashboard/stats/");
}

export function fetchAdminApplications() {
  return request("/admin/applications/");
}

export function fetchAdminInstitutions() {
  return request("/admin/institutions/");
}

export function fetchAdminAnalytics() {
  return request("/admin/analytics/");
}
