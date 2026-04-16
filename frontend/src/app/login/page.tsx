import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main style={{ padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Iniciar Sesion</h1>
      <LoginForm />
    </main>
  );
}
