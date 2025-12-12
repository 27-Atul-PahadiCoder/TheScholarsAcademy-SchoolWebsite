const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

const ADMIN_TOKEN_KEY = "scholar-admin-token";

export const getAdminToken = () => sessionStorage.getItem(ADMIN_TOKEN_KEY);
export const setAdminToken = (token: string) =>
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
export const clearAdminToken = () => sessionStorage.removeItem(ADMIN_TOKEN_KEY);

export type HttpOptions = RequestInit & {
  auth?: boolean;
};

async function parseJson(res: Response) {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    return { raw: text };
  }
  return res.json();
}

export async function request<T = unknown>(
  path: string,
  options: HttpOptions = {}
): Promise<T> {
  const { auth, headers, body, ...rest } = options;
  const mergedHeaders = new Headers(headers);

  const isFormData = body instanceof FormData;
  if (!isFormData && !mergedHeaders.has("Content-Type")) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAdminToken();
    if (!token) {
      throw new Error("Admin authentication required");
    }
    mergedHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    body,
    headers: mergedHeaders,
  });

  const payload = await parseJson(response);
  if (!response.ok) {
    const message = (payload as any)?.error ?? response.statusText;
    throw new Error(message || "Request failed");
  }

  if ((payload as any)?.data !== undefined) {
    return (payload as any).data as T;
  }

  return payload as T;
}

export function buildAssetUrl(url: string) {
  if (!url.startsWith("http")) {
    const base = API_BASE_URL.replace(/\/?api$/, "");
    return `${base}${url}`;
  }
  return url;
}
