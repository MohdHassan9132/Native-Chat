const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export class ApiRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

const FALLBACK_MESSAGES = {
  400: "Please check the details you entered and try again.",
  401: "Your session is not valid. Please log in again.",
  403: "You are not allowed to do that.",
  404: "We couldn't find what you were looking for.",
  409: "That already exists.",
  503: "The service is temporarily unavailable. Please try again shortly.",
  498: "Your session has expired. Please log in again.",
};

/**
 * Sends a JSON request with cookies and returns the backend's `data` payload
 * (the `{ statusCode, message, data }` wrapper is stripped here).
 * Throws ApiRequestError with a user-presentable message on any failure.
 */
export async function apiRequest(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiRequestError("Can't reach the server. Check your connection and try again.", 0);
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON body (e.g. proxy error page) — fall through to generic message.
  }

  if (!response.ok) {
    const message =
      (response.status < 500 && payload?.message) ||
      FALLBACK_MESSAGES[response.status] ||
      "Something went wrong on our side. Please try again.";
    throw new ApiRequestError(message, response.status);
  }

  return payload?.data;
}
