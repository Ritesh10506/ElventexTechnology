"use client";

import { getToken, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { getMyRequests, createRequest, uploadMedia } from "@/lib/api";
// media_files now comes back from the backend on each request,
// so uploads persist across refreshes — no local-only tracking needed

const SERVICE_TYPES = [
  "website_making",
  "website_health_check",
  "seo_optimization",
  "graphic_designing",
  "logo_designing",
  "updating_website",
];

const STATUS_STYLES = {
  pending: "border-signal/50 bg-signal/10 text-ink",
  in_progress: "border-blueprint/50 bg-blueprint/10 text-blueprint",
  in_review: "border-blueprint/50 bg-blueprint/10 text-blueprint",
  completed: "border-ink/30 bg-ink/5 text-ink",
  cancelled: "border-line bg-paper text-ink-soft line-through decoration-1",
};

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [requests, setRequests] = useState([]);
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [uploadingRequestId, setUploadingRequestId] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const savedToken = getToken();
    if (!savedToken) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }
    setToken(savedToken);
    loadRequests(savedToken);
  }, []);

  async function loadRequests(currentToken) {
    try {
      const data = await getMyRequests(currentToken);
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createRequest(token, serviceType, description);
      setDescription("");
      await loadRequests(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleFileChange(requestId, e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setUploadingRequestId(requestId);
    try {
      await uploadMedia(token, requestId, file);
      await loadRequests(token); // refresh so the new file shows up
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingRequestId(null);
      e.target.value = ""; // reset the input so the same file can be picked again if needed
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-ink-soft">
          LOADING…
        </p>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="blueprint-grid flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
        <div className="w-full max-w-sm border border-line bg-paper-raised p-8 text-center">
          <p className="text-sm text-ink-soft">{error || "You are not logged in."}</p>
          <a
            href="/login"
            className="mt-5 inline-block border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint"
          >
            Go to login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-1 font-[family-name:var(--font-mono)] text-xs tracking-wide text-blueprint">
            [ DASHBOARD ]
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
            Your requests
          </h1>
        </div>
        <button
          onClick={logout}
          className="border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-blueprint hover:text-blueprint"
        >
          Log out
        </button>
      </div>

      {error && (
        <p className="mb-6 border border-signal/40 bg-signal/10 px-3 py-2 text-sm text-ink">
          {error}
        </p>
      )}

      {/* New request form */}
      <section className="mb-10 border border-line bg-paper-raised p-6">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-base font-semibold text-ink">
          Submit a new request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Service type
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-blueprint"
            >
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Describe what you need
            </label>
            <textarea
              placeholder="A couple of sentences is enough to get started…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full resize-none border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-blueprint"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-blueprint hover:border-blueprint disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit request"}
          </button>
        </form>
      </section>

      {/* Requests list */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-ink">
            History
          </h2>
          {uploadError && (
            <p className="text-xs text-signal">{uploadError}</p>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="border border-dashed border-line px-6 py-10 text-center">
            <p className="text-sm text-ink-soft">
              No requests yet — submit one above to get started.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((r) => (
              <li key={r.id} className="border border-line bg-paper-raised p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
                    {r.service_type.replaceAll("_", " ")}
                  </h3>
                  <span
                    className={`border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide ${
                      STATUS_STYLES[r.status] || STATUS_STYLES.pending
                    }`}
                  >
                    {r.status.replaceAll("_", " ")}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-ink-soft">
                  {r.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
                  <label className="cursor-pointer border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-blueprint hover:text-blueprint">
                    {uploadingRequestId === r.id ? "Uploading…" : "+ Attach file"}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => handleFileChange(r.id, e)}
                      disabled={uploadingRequestId === r.id}
                      className="hidden"
                    />
                  </label>
                </div>

                {(r.media_files || []).length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {r.media_files.map((media) => (
                      <div key={media.id}>
                        {media.file_type === "image" ? (
                          <img
                            src={media.storage_url}
                            alt="uploaded attachment"
                            className="h-20 w-20 border border-line object-cover"
                          />
                        ) : (
                          <a
                            href={media.storage_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-20 w-20 items-center justify-center border border-line text-center text-[10px] text-blueprint underline"
                          >
                            View video
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}