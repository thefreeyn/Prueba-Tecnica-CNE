"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/constants";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/users/logout", { method: "POST" });
      router.push(ROUTES.LOGIN);
    } catch {
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}>
      {loading ? "Cerrando..." : "Cerrar sesion"}
    </button>
  );
}
