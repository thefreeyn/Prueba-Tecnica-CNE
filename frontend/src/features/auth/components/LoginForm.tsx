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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px", margin: "0 auto" }}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
        />
        {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
        />
        {errors.password && <span style={{ color: "red", fontSize: "14px" }}>{errors.password.message}</span>}
      </div>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <button type="submit" disabled={loading} style={{ padding: "10px", cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
