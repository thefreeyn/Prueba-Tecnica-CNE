import { NextRequest, NextResponse } from "next/server";
import { validateCredentials } from "@/lib/mock-data";
import { setSessionCookies } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email y password son requeridos" }, { status: 400 });
    }

    if (!validateCredentials(email, password)) {
      return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 });
    }

    await setSessionCookies();

    return NextResponse.json({ message: "Login exitoso" });
  } catch {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
