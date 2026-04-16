"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { API_ROUTES } from "@/lib/constants";
import { httpClient } from "@/lib/http/client";
import ProfileForm from "@/features/profile/components/ProfileForm";
import AuthenticatedLayout from "@/features/shared/components/AuthenticatedLayout";

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

  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-on-surface-variant text-lg">Cargando perfil...</div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (error) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-error-container text-on-error-container px-6 py-4 rounded-xl">{error}</div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (!user) return null;

  return (
    <AuthenticatedLayout>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">Mi Perfil</h1>
        <p className="text-on-surface-variant max-w-2xl">
          Gestiona tu identidad digital y revisa los detalles de tu cuenta.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Hero Card */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary-container/20 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container-high border-4 border-surface shadow-md flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_circle
              </span>
            </div>
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Miembro Premium
              </div>
              <h2 className="text-4xl font-black text-on-surface leading-none mb-2">{user.name}</h2>
              <div className="flex flex-wrap gap-4 text-on-surface-variant font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">mail</span>
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Miembro desde {new Date(user.createdAt).toLocaleDateString("es")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-on-surface-variant font-bold text-sm uppercase tracking-widest mb-6">Estado de Cuenta</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-on-surface-variant mb-1">Plan actual</p>
                  <p className="text-2xl font-black text-on-surface">Premium</p>
                </div>
                <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-1 rounded-full">
                  Activa
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary w-4/5 rounded-full" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <p className="text-xs text-on-surface-variant mb-2">Miembro desde</p>
            <p className="text-on-surface font-semibold">{new Date(user.createdAt).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>

        {/* Edit Profile Card */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-50 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <h3 className="text-lg font-bold">Editar Perfil</h3>
          </div>
          <ProfileForm currentName={user.name} onUpdated={setUser} />
        </div>

        {/* Security Card */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-sky-50 text-primary rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">security</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Seguridad</h4>
          <p className="text-on-surface-variant text-sm mb-4">
            Tu cuenta esta protegida con autenticacion segura.
          </p>
          <span className="text-primary font-bold text-sm flex items-center gap-1">
            Configurar
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>

        {/* Integrations Card */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-secondary/5 text-secondary rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">api</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Integraciones</h4>
          <p className="text-on-surface-variant text-sm mb-4">
            Conecta con tus herramientas favoritas.
          </p>
          <span className="text-primary font-bold text-sm flex items-center gap-1">
            Ver todas
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>

        {/* Notifications Card */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-tertiary/5 text-tertiary rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Preferencias</h4>
          <p className="text-on-surface-variant text-sm mb-4">
            Personaliza como y cuando recibes actualizaciones.
          </p>
          <span className="text-primary font-bold text-sm flex items-center gap-1">
            Gestionar
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>

        {/* Additional Info Card */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">info</span>
          </div>
          <h4 className="text-lg font-bold mb-2">Soporte</h4>
          <p className="text-on-surface-variant text-sm mb-4">
            Contacta con nuestro equipo de soporte premium.
          </p>
          <span className="text-primary font-bold text-sm flex items-center gap-1">
            Contactar
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 flex justify-between items-center text-on-surface-variant text-xs font-medium uppercase tracking-widest">
        <div className="flex gap-6">
          <span className="hover:text-primary transition-colors">Privacidad</span>
          <span className="hover:text-primary transition-colors">Terminos</span>
          <span className="hover:text-primary transition-colors">Soporte</span>
        </div>
        <span>&copy; 2025 The Fluid Architect</span>
      </footer>
    </AuthenticatedLayout>
  );
}
