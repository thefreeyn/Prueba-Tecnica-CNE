"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import LogoutButton from "@/features/auth/components/LogoutButton";

const NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: "Panel", icon: "dashboard" },
  { href: ROUTES.ME, label: "Perfil", icon: "person" },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-50/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 w-full">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.DASHBOARD} className="text-xl font-bold text-slate-900 font-headline tracking-tight">
            The Fluid Architect
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium text-sm flex items-center gap-2 ${
                    isActive
                      ? "text-sky-600 font-semibold border-b-2 border-sky-500 py-1"
                      : "text-slate-500 hover:text-sky-600 py-1"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LogoutButton />
        </div>
      </div>
      <div className="bg-slate-200/50 h-[1px] w-full absolute bottom-0" />
    </nav>
  );
}
