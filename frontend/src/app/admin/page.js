"use client";

import { useEffect, useState } from "react";
import { adminLogin, getAllRequests, updateRequestStatus } from "@/lib/api";

const STATUSES = [
  "pending",
  "in_progress",
  "in_review",
  "completed",
  "cancelled",
];

export default function Admin() {
  const [adminToken, setAdminToken] = useState(null);
  const [checkingStorage, setCheckingStorage] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestsError, setRequestsError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setAdminToken(saved);
    setCheckingStorage(false);
  }, []);

  useEffect(() => {
    if (adminToken) loadRequests(adminToken);
  }, [adminToken]);

  async function loadRequests(token) {
    setLoadingRequests(true);
    setRequestsError("");
    try {
      const data = await getAllRequests(token);
      setRequests(data);
    } catch (err) {
      setRequestsError(err.message);
      if (err.message.includes("Failed")) {
        // token likely invalid/expired — send back to login
        handleLogout();
      }
    } finally {
      setLoadingRequests(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem("admin_token", data.access_token);
      setAdminToken(data.access_token);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
    setRequests([]);
  }

  async function handleStatusChange(requestId, newStatus) {
    try {
      await updateRequestStatus(adminToken, requestId, newStatus);
      await loadRequests(adminToken);
    } catch (err) {
      setRequestsError(err.message);
    }
  }

  if (checkingStorage) return null;

  if (!adminToken) {
    return (
      <main>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Log in</button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </main>
    );
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Log out</button>

      {loadingRequests && <p>Loading requests...</p>}
      {requestsError && <p style={{ color: "red" }}>{requestsError}</p>}

      {!loadingRequests && requests.length === 0 && <p>No requests yet.</p>}

      <table border="1" cellPadding="8" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Service Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.customer.name}</td>
              <td>{r.customer.email}</td>
              <td>{r.customer.mobile_number}</td>
              <td>{r.service_type.replaceAll("_", " ")}</td>
              <td>{r.description}</td>
              <td>
                <select
                  value={r.status}
                  onChange={(e) => handleStatusChange(r.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}