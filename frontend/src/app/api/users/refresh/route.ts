import { NextResponse } from "next/server";
import { getRefreshToken, setSessionCookies } from "@/lib/session";

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      return NextResponse.json({ message: "No hay refresh token" }, { status: 401 });
    }

    await setSessionCookies();

    return NextResponse.json({ message: "Sesion renovada" });
  } catch {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
