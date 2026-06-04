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

export function reviewAdminNomination(collegeId, reviewData) {
  return request(`/admin/nominations/${collegeId}/review/`, {
    method: "POST",
    body: JSON.stringify(reviewData),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
