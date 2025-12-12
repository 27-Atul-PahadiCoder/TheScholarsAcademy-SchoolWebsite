import { request, setAdminToken, clearAdminToken, getAdminToken } from "./http";

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
  const result = await request<AdminLoginResponse>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAdminToken(result.token);
  return result;
}

export function logoutAdmin() {
  clearAdminToken();
  sessionStorage.removeItem("admin-authenticated");
}

export function hasAdminSession() {
  return Boolean(
    getAdminToken() && sessionStorage.getItem("admin-authenticated") === "true"
  );
}
