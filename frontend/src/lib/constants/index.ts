export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ME: "/me",
} as const;

export const API_ROUTES = {
  LOGIN: "/api/users/login",
  REFRESH: "/api/users/refresh",
  ME: "/api/users/me",
} as const;

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const TOKEN_EXPIRATION_MS = 60 * 1000;
