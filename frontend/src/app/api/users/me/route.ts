import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, isTokenExpired } from "@/lib/session";
import { getMockUser, getMockUserName, setMockUserName } from "@/lib/mock-data";

export async function GET() {
  try {
    const token = await getAccessToken();

    if (!token || isTokenExpired(token)) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const user = getMockUser();
    user.name = getMockUserName();

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = await getAccessToken();

    if (!token || isTokenExpired(token)) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ message: "El nombre es requerido" }, { status: 400 });
    }

    setMockUserName(name.trim());

    const user = getMockUser();
    user.name = getMockUserName();

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
