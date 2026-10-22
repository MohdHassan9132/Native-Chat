import { useSyncExternalStore } from "react";

export function readCookie(name) {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split(/;\s*/)
    .find((c) => c.startsWith(`${name}=`));

  return match
    ? decodeURIComponent(match.slice(name.length + 1))
    : null;
}

export function getAuthToken() {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("nativechat_accessToken");
    if (local) return local;
  }
  return readCookie("accessToken");
}

function parseJwt(token) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) {
      b64 += "=";
    }

    return JSON.parse(atob(b64));
  } catch {
    return null;
  }
}

// Client-side hint only. The backend must verify the JWT.
export function hasValidSession() {
  const token = getAuthToken();
  if (!token) return false;

  const payload = parseJwt(token);
  if (!payload) return false;

  return !payload.exp || payload.exp * 1000 > Date.now();
}

const subscribe = () => () => {};

export function useIsLoggedIn() {
  return useSyncExternalStore(
    subscribe,
    hasValidSession,
    () => false
  );
}

// Unverified user ID for client-side display/matching only.
export function getSessionUserId() {
  if (typeof window !== "undefined") {
    const localId = localStorage.getItem("nativechat_userId");
    if (localId) return localId;
  }

  const token = getAuthToken();
  if (!token) return null;

  const payload = parseJwt(token);
  if (payload?.userId) {
    if (typeof window !== "undefined") {
      localStorage.setItem("nativechat_userId", payload.userId);
    }
    return payload.userId;
  }

  return null;
}
