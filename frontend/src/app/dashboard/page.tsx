"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import LogoutButton from "@/features/auth/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>
      <p>Bienvenido al panel principal.</p>
      <nav style={{ marginTop: "16px" }}>
        <Link href={ROUTES.ME} style={{ color: "#0070f3", textDecoration: "underline" }}>
          Ver mi perfil
        </Link>
      </nav>
    </main>
  );
}
