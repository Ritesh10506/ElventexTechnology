"use client";
import { getToken, logout } from "@/lib/auth";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import { getMyRequests, createRequest, uploadMedia } from "@/lib/api";
// media_files now comes back from the backend on each request,
// so uploads persist across refreshes — no local-only tracking needed

const SERVICE_TYPES = [
  "website_designing",
  "website_health_check",
  "seo_optimization",
  "graphic_designing",
  "logo_designing",
  "updating_website",
];

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [requests, setRequests] = useState([]);
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    try {
      await createRequest(token, serviceType, description);
      setDescription("");
      await loadRequests(token);
    } catch (err) {
      setError(err.message);
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

  if (loading) return <main><p>Loading...</p></main>;

  return (
    <main>
      <h1>Client Dashboard</h1>
       <button onClick={logout}>Log out</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {token && (
        <>
          <h2>Submit a new request</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {SERVICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <br />
            <textarea
              placeholder="Describe your work"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <button type="submit">Submit Request</button>
          </form>

          <h2>Your requests</h2>
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
          {requests.length === 0 && <p>No requests yet.</p>}
          <ul>
            {requests.map((r) => (
              <li key={r.id} style={{ marginBottom: "1rem" }}>
                <strong>{r.service_type.replaceAll("_", " ")}</strong> —{" "}
                {r.status} — {r.description}
                <br />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileChange(r.id, e)}
                  disabled={uploadingRequestId === r.id}
                />
                {uploadingRequestId === r.id && <span> Uploading...</span>}

                {(r.media_files || []).map((media) => (
                  <div key={media.id} style={{ marginTop: "0.5rem" }}>
                    {media.file_type === "image" ? (
                      <img
                        src={media.storage_url}
                        alt="uploaded"
                        style={{ maxWidth: "150px", display: "block" }}
                      />
                    ) : (
                      <a href={media.storage_url} target="_blank" rel="noreferrer">
                        View uploaded video
                      </a>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}