"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@/types";
import { API_ROUTES, ROUTES } from "@/lib/constants";
import { httpClient } from "@/lib/http/client";
import ProfileForm from "@/features/profile/components/ProfileForm";
import LogoutButton from "@/features/auth/components/LogoutButton";

export default function MePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await httpClient.fetch<User>(API_ROUTES.ME);
        setUser(data);
      } catch (err: unknown) {
        const e = err as { message?: string };
        setError(e.message || "Error al cargar perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <main style={{ padding: "40px 20px" }}><p>Cargando perfil...</p></main>;
  if (error) return <main style={{ padding: "40px 20px" }}><p style={{ color: "red" }}>{error}</p></main>;
  if (!user) return null;

  return (
    <main style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Mi Perfil</h1>
        <LogoutButton />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString("es")}</p>
      </div>

      <h2 style={{ marginBottom: "12px" }}>Editar nombre</h2>
      <ProfileForm currentName={user.name} onUpdated={setUser} />

      <nav style={{ marginTop: "24px" }}>
        <Link href={ROUTES.DASHBOARD} style={{ color: "#0070f3", textDecoration: "underline" }}>
          Volver al dashboard
        </Link>
      </nav>
    </main>
  );
}
