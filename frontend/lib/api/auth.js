import { apiRequest } from "./client";

// POST /api/auth/register — sends an OTP to the phone (E.164, e.g. +919876543210)
// and returns the challengeId to verify against.
export async function startRegistration({ phoneNumber }) {
  const data = await apiRequest("/api/auth/register", {
    method: "POST",
    body: { phoneNumber },
  });
  return data?.challengeId;
}

// POST /api/auth/register/verify — on success the backend creates the user
// and sets the auth cookies.
export async function verifyRegistration({ challengeId, userOTP }) {
  const data = await apiRequest("/api/auth/register/verify", {
    method: "POST",
    body: { challengeId, userOTP },
  });

  const userId = data?.userId || data?.userData?.userId;
  const accessToken = data?.accessToken;

  if (typeof window !== "undefined") {
    if (userId) {
      localStorage.setItem("nativechat_userId", userId);
    }
    if (accessToken) {
      localStorage.setItem("nativechat_accessToken", accessToken);
    }
  }

  return data?.userData || data;
}

// POST /api/auth/login — sends OTP for login
export async function startLogin({ identifier }) {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: { identifier },
  });
  return data?.challengeId;
}

// POST /api/auth/login/verify — verifies login OTP
export async function verifyLogin({ challengeId, userOTP }) {
  const data = await apiRequest("/api/auth/login/verify", {
    method: "POST",
    body: { challengeId, userOTP },
  });

  const userId = data?.userId || data?.userData?.userId;
  const accessToken = data?.accessToken;

  if (typeof window !== "undefined") {
    if (userId) {
      localStorage.setItem("nativechat_userId", userId);
    }
    if (accessToken) {
      localStorage.setItem("nativechat_accessToken", accessToken);
    }
  }

  return data?.userData || data;
}
