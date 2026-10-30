import axios from "axios";
import toast from "react-hot-toast";

// In dev, Vite proxies /api to the backend (see vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed backend URL.
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL,
  withCredentials: true, // send the httpOnly admin cookie when present
  timeout: 30000, // 30s safety net so hung requests don't hang the UI
});

/* ─── Global response interceptor ─────────────────────────────
 * Handles cross-cutting concerns so individual components don't have to:
 *   - 401 responses  → broadcast an "auth:unauthorized" event that the
 *                      AuthContext listens for and uses to log the admin out.
 *                      We use an event (rather than importing AuthContext
 *                      directly) to avoid a circular dependency.
 *   - Network errors → show a single toast so users know they're offline
 *                      instead of staring at silently-empty screens.
 *
 * All other errors are re-thrown so each caller can still handle them
 * with its own UX (existing toast messages, empty-state fallbacks, etc.).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Only broadcast when an admin session actually existed — this avoids
      // noisy logouts on public endpoints (e.g. /admin/login failure).
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    } else if (!error.response) {
      // No response at all → true network failure, DNS issue, or timeout.
      toast.error("Network error. Please check your connection and try again.");
    }

    return Promise.reject(error);
  }
);

export default api;
