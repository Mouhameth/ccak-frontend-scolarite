"use client";

type ApiOptions = Omit<RequestInit, "body" | "headers"> & {
  /** Relative path (appends to base) or absolute URL */
  path: string;
  /** When true, treats empty responses as null */
  expectJson?: boolean;
  /** Request body: JSON-serializable object or standard BodyInit */
  body?: BodyInit | Record<string, unknown> | null;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  status: number;
  statusText: string;
  body?: unknown;

  constructor(message: string, status: number, statusText: string, body?: unknown) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  (typeof window === "undefined" ? "" : window.location.origin);

// Replace with your real token lookup (cookie, Zustand store, etc.)
function getAuthToken(): string | undefined {
  return undefined;
}

async function handleResponse<T>(res: Response, expectJson: boolean): Promise<T> {
  if (res.ok) {
    if (expectJson === false || res.status === 204) {
      return null as T;
    }
    const text = await res.text();
    if (!text) return null as T;
    return JSON.parse(text) as T;
  }

  let body: unknown = undefined;
  try {
    body = await res.json();
  } catch {
    // non-JSON error body
  }
  const error = new ApiError("Request failed", res.status, res.statusText, body);
  throw error;
}

export async function apiFetch<T = unknown>(options: ApiOptions): Promise<T> {
  const { path, expectJson = true, headers, body, ...rest } = options;

  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  const authToken = getAuthToken();

  const isJsonBody =
    body &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob);

  const mergedHeaders: HeadersInit = {
    ...(isJsonBody ? { "Content-Type": "application/json" } : null),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : null),
    ...headers,
  };

  const init: RequestInit = {
    ...rest,
    headers: mergedHeaders,
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit),
  };

  const res = await fetch(url, init);
  return handleResponse<T>(res, expectJson);
}

// Convenience helpers
export const api = {
  get: <T>(path: string, init: Omit<ApiOptions, "path" | "method" | "body"> = {}) =>
    apiFetch<T>({ path, method: "GET", ...init }),
  post: <T>(
    path: string,
    body?: ApiOptions["body"],
    init: Omit<ApiOptions, "path" | "method" | "body"> = {},
  ) => apiFetch<T>({ path, method: "POST", body, ...init }),
  put: <T>(
    path: string,
    body?: ApiOptions["body"],
    init: Omit<ApiOptions, "path" | "method" | "body"> = {},
  ) => apiFetch<T>({ path, method: "PUT", body, ...init }),
  patch: <T>(
    path: string,
    body?: ApiOptions["body"],
    init: Omit<ApiOptions, "path" | "method" | "body"> = {},
  ) => apiFetch<T>({ path, method: "PATCH", body, ...init }),
  del: <T>(path: string, init: Omit<ApiOptions, "path" | "method" | "body"> = {}) =>
    apiFetch<T>({ path, method: "DELETE", ...init }),
};
