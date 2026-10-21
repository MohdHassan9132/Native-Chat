const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export class ApiRequestError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.data = data;
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
  429: "Too many attempts. Please wait a little before trying again.",
};

const isProtectedApiPath = (path) =>
  path.startsWith("/api/chats/") || path.startsWith("/api/users/complete-profile");

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
    if (
      typeof window !== "undefined" &&
      isProtectedApiPath(path) &&
      (response.status === 401 || response.status === 498) &&
      window.location.pathname !== "/"
    ) {
      window.location.replace("/");
    }

    let message = response.status >= 500
      ? "Something went wrong on our side. Please try again shortly."
      : FALLBACK_MESSAGES[response.status] || payload?.message || "Please try again.";
    const block = payload?.data;
    if (response.status === 429 && block?.blockedUntil) {
      const blockedTime = new Date(block.blockedUntil);
      const timeLabel = Number.isNaN(blockedTime.getTime())
        ? block.blockedUntil
        : blockedTime.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
      const contactLabel = block.identifierType === "email" ? "email address" : "phone number";
      const alternateLabel = block.alternateIdentifierType === "email" ? "email address" : "phone number";
      message = `Your ${contactLabel} is blocked until ${timeLabel}. Try signing in with the ${alternateLabel} linked to your account, or retry this ${contactLabel} after that time.`;
    }
    throw new ApiRequestError(message, response.status, block);
  }

  return payload?.data;
}
