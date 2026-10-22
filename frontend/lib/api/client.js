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
  498: "Your session has expired. Please log in again.",
  503: "The service is temporarily unavailable. Please try again shortly.",
};

export async function apiRequest(path, { method = "GET", body } = {}) {
  if (!BASE_URL) {
    throw new ApiRequestError("Backend URL is not configured.", 0);
  }

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("nativechat_accessToken");
  }

  const headers = {};
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    console.error("API network/CORS error:", error);

    throw new ApiRequestError(
      "Can't reach the server. Check your connection and try again.",
      0
    );
  }

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    // Response body wasn't JSON.
  }

  if (!response.ok) {
    console.error("API request failed:", {
      path,
      status: response.status,
      message: payload?.message,
    });

    const message =
      (response.status < 500 && payload?.message) ||
      FALLBACK_MESSAGES[response.status] ||
      "Something went wrong on our side. Please try again.";

    throw new ApiRequestError(message, response.status);
  }

  return payload?.data;
}
