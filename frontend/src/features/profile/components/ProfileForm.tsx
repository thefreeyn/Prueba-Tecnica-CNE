"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { profileSchema, ProfileFormData } from "../schemas/profile-schema";
import { API_ROUTES } from "@/lib/constants";
import { httpClient } from "@/lib/http/client";
import { User } from "@/types";

interface ProfileFormProps {
  currentName: string;
  onUpdated: (user: User) => void;
}

export default function ProfileForm({ currentName, onUpdated }: ProfileFormProps) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: currentName },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setServerError("");
    setSuccess(false);
    setLoading(true);

    try {
      const updated = await httpClient.fetch<User>(API_ROUTES.ME, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      onUpdated(updated);
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setServerError(error.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px" }}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
        />
        {errors.name && <span style={{ color: "red", fontSize: "14px" }}>{errors.name.message}</span>}
      </div>

      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      {success && <p style={{ color: "green" }}>Nombre actualizado</p>}

      <button type="submit" disabled={loading} style={{ padding: "10px", cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
