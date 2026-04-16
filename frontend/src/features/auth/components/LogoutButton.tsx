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
    <button
      onClick={handleLogout}
      disabled={loading}
      className="hover:bg-sky-50 transition-colors duration-200 p-2 rounded-full text-slate-500 active:scale-95 disabled:opacity-50 cursor-pointer"
      title="Cerrar sesion"
    >
      <span className="material-symbols-outlined">logout</span>
    </button>
  );
}
