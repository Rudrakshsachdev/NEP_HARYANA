const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

import { AUTH_TOKEN_KEY } from "./auth";

async function request(path, options = {}) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const authHeader = token ? { Authorization: `Token ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const fallbackMessage = "Request failed.";
    const firstMessage =
      data?.detail ||
      data?.message ||
      Object.values(data || {})?.flat?.()?.[0] ||
      fallbackMessage;
    throw new Error(firstMessage);
  }

  return data;
}

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
