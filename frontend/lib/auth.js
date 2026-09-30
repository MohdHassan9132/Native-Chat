import { useSyncExternalStore } from "react";

export function readCookie(name) {
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

// Client-side hint only: the cookie exists and its JWT `exp` hasn't passed.
// The signature can't be verified here — the backend stays authoritative.
export function hasValidSession() {
  const token = readCookie("accessToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

// false on the server / first render (so hydration matches), then the real value.
export function useIsLoggedIn() {
  return useSyncExternalStore(subscribe, hasValidSession, () => false);
}
