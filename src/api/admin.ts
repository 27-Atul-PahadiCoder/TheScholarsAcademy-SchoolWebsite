import { z } from "zod";

const TOKEN_KEY = "school-admin-token";

export type AdminLoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export async function loginAdmin(email: string, password: string) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error ?? "Login failed");
  }

  const loginInfo: AdminLoginResponse = (await res.json()).data;
  localStorage.setItem(TOKEN_KEY, loginInfo.token);
  return loginInfo;
}

export function hasAdminSession() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export const getAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};
