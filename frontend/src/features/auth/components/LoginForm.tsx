"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "../schemas/login-schema";
import { API_ROUTES, ROUTES } from "@/lib/constants";

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json();
        setServerError(body.message || "Error al iniciar sesion");
        return;
      }

      router.push(ROUTES.DASHBOARD);
    } catch {
      setServerError("Error de conexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-on-surface tracking-wide" htmlFor="email">
          Correo electronico
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
            mail
          </span>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="correo@ejemplo.com"
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none"
          />
        </div>
        {errors.email && (
          <span className="text-error text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-on-surface tracking-wide" htmlFor="password">
          Contrasena
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
            lock
          </span>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none"
          />
        </div>
        {errors.password && (
          <span className="text-error text-sm">{errors.password.message}</span>
        )}
      </div>

      {serverError && (
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
          {serverError}
        </div>
      )}

      {/* Action Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-primary text-white font-semibold py-4 px-6 rounded-xl ambient-shadow hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{loading ? "Ingresando..." : "Ingresar al Panel"}</span>
        {!loading && (
          <span className="material-symbols-outlined">arrow_forward</span>
        )}
      </button>
    </form>
  );
}
