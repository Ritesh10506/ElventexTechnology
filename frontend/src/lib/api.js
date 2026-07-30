const API_BASE_URL = "http://localhost:8000";

export async function requestOtp(name, mobileNumber, email) {
  const res = await fetch(`${API_BASE_URL}/auth/otp/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, mobile_number: mobileNumber, email }),
  });
  if (!res.ok) throw new Error("Failed to send OTP");
  return res.json();
}

export async function verifyOtp(email, code) {
  const res = await fetch(`${API_BASE_URL}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) throw new Error("Incorrect or expired code");
  return res.json();
}
export async function getMyRequests(token) {
  const res = await fetch(`${API_BASE_URL}/requests/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load requests");
  return res.json();
}

export async function createRequest(token, serviceType, description) {
  const res = await fetch(`${API_BASE_URL}/requests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ service_type: serviceType, description }),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
}

export async function uploadMedia(token, requestId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/media/upload/${requestId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    // no Content-Type header here — the browser sets the correct
    // multipart/form-data boundary automatically for FormData
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload file");
  return res.json();
}

// ---- Admin ----

export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Incorrect email or password");
  return res.json();
}

export async function getAllRequests(adminToken) {
  const res = await fetch(`${API_BASE_URL}/admin/requests`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  if (!res.ok) throw new Error("Failed to load requests");
  return res.json();
}

export async function updateRequestStatus(adminToken, requestId, status) {
  const res = await fetch(`${API_BASE_URL}/admin/requests/${requestId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}