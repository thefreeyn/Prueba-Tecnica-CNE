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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-semibold text-on-surface tracking-wide">
          Nombre
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">
            badge
          </span>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 outline-none"
          />
        </div>
        {errors.name && <span className="text-error text-sm">{errors.name.message}</span>}
      </div>

      {serverError && (
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
          {serverError}
        </div>
      )}
      {success && (
        <div className="bg-secondary-container text-on-secondary-container px-4 py-3 rounded-xl text-sm font-medium">
          Nombre actualizado
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
