import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prueba Tecnica CNE",
  description: "Frontend de la prueba tecnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
