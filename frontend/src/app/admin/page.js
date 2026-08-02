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

const STATUS_STYLES = {
  pending: "border-signal/50 bg-signal/10 text-ink",
  in_progress: "border-blueprint/50 bg-blueprint/10 text-blueprint",
  in_review: "border-blueprint/50 bg-blueprint/10 text-blueprint",
  completed: "border-ink/30 bg-ink/5 text-ink",
  cancelled: "border-line bg-paper text-ink-soft",
};

export default function Admin() {
  const [adminToken, setAdminToken] = useState(null);
  const [checkingStorage, setCheckingStorage] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

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
    setLoggingIn(true);
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem("admin_token", data.access_token);
      setAdminToken(data.access_token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
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

  const inputClasses =
    "w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-blueprint";

  if (!adminToken) {
    return (
      <main className="blueprint-grid flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-center font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
            [ ADMIN ]
          </p>
          <h1 className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
            Staff sign in
          </h1>

          <div className="border border-line bg-paper-raised p-7">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Admin email
                </label>
                <input
                  className={inputClasses}
                  type="email"
                  placeholder="you@elventex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Password
                </label>
                <input
                  className={inputClasses}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full border border-ink bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingIn ? "Signing in…" : "Log in"}
              </button>
            </form>

            {loginError && (
              <p className="mt-4 border border-signal/40 bg-signal/10 px-3 py-2 text-xs text-ink">
                {loginError}
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
            [ ADMIN ]
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
            All requests
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-blueprint hover:text-blueprint"
        >
          Log out
        </button>
      </div>

      {requestsError && (
        <p className="mb-6 border border-signal/40 bg-signal/10 px-3 py-2 text-sm text-ink">
          {requestsError}
        </p>
      )}

      {loadingRequests ? (
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-ink-soft">
          LOADING…
        </p>
      ) : requests.length === 0 ? (
        <div className="border border-dashed border-line px-6 py-10 text-center">
          <p className="text-sm text-ink-soft">No requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-raised">
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Customer
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Mobile
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Service
                </th>
                <th className="px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wide text-ink-soft">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-b-0">
                  <td className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-ink-soft">
                    #{r.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <p className="text-ink">{r.customer.name}</p>
                    <p className="text-xs text-ink-soft">{r.customer.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                    {r.customer.mobile_number || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-ink">
                    {r.service_type.replaceAll("_", " ")}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-ink-soft">{r.description}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`border px-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide outline-none ${
                        STATUS_STYLES[r.status] || STATUS_STYLES.pending
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-[family-name:var(--font-mono)] text-xs text-ink-soft">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}