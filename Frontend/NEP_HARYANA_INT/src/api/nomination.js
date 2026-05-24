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

export function fetchNominationHeader() {
  return request("/nomination-header/");
}

export function openNominationHeaderForm() {
  return request("/nomination-header/open/", {
    method: "POST",
  });
}

export function fetchNominationHeaderById(formId) {
  return request(`/nomination-header/${formId}/`);
}

export function saveNominationHeaderById(formId, payload) {
  return request(`/nomination-header/${formId}/`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function fetchIndicatorsByFormId(formId) {
  return request(`/nomination-header/${formId}/indicators/`);
}

export function saveIndicators(formId, indicatorsList) {
  return request(`/nomination-header/${formId}/indicators/save/`, {
    method: "POST",
    body: JSON.stringify(indicatorsList),
  });
}

export async function uploadIndicatorFile(formId, indicatorNum, file) {
  const cloudName = "duimpfjil";
  const uploadPreset = "NEP_EXCELLENCE-AWARDS";

  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", file);
  cloudinaryFormData.append("upload_preset", uploadPreset);

  const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: cloudinaryFormData,
  });

  const cloudinaryData = await cloudinaryResponse.json();
  if (!cloudinaryResponse.ok) {
    throw new Error(cloudinaryData.error?.message || "Cloudinary upload failed.");
  }

  const secureUrl = cloudinaryData.secure_url;

  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
  ).replace(/\/$/, "");
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const authHeader = token ? { Authorization: `Token ${token}` } : {};

  const backendResponse = await fetch(`${API_BASE_URL}/nomination-header/${formId}/indicators/${indicatorNum}/upload/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body: JSON.stringify({
      file_url: secureUrl,
    }),
  });

  const backendData = await backendResponse.json();
  if (!backendResponse.ok) {
    throw new Error(backendData.detail || backendData.message || "Failed to save file URL on backend.");
  }

  return {
    indicator_number: indicatorNum,
    uploaded_file_name: secureUrl.split("/").pop(),
    uploaded_file_url: secureUrl,
  };
}
