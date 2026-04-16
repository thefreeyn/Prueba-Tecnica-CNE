import { COOKIE_NAMES, TOKEN_EXPIRATION_MS } from "@/lib/constants";
import { cookies } from "next/headers";

export async function setSessionCookies(): Promise<void> {
  const cookieStore = await cookies();
  const now = Date.now();
  const accessToken = Buffer.from(JSON.stringify({ sub: "1", exp: now + TOKEN_EXPIRATION_MS })).toString("base64");
  const refreshToken = Buffer.from(JSON.stringify({ sub: "1", type: "refresh" })).toString("base64");

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: TOKEN_EXPIRATION_MS / 1000,
    sameSite: "lax",
  });

  cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
    sameSite: "lax",
  });
}

export async function clearSessionCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    return Date.now() > payload.exp;
  } catch {
    return true;
  }
}
