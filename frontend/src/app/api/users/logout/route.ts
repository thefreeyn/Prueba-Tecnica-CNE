import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/lib/session";

export async function POST() {
  try {
    await clearSessionCookies();
    return NextResponse.json({ message: "Sesion cerrada" });
  } catch {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
