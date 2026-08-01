// Small helpers for reading/clearing the customer's login token.
// Kept separate from api.js since these don't talk to the network.

export function getToken() {
  if (typeof window === "undefined") return null; // safety for server-side rendering
  return localStorage.getItem("access_token");
}

export function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}