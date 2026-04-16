import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="bg-surface font-body text-on-surface antialiased min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-surface-container-low rounded-xl overflow-hidden ambient-shadow">
        {/* Left: Brand Side */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-primary relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white mb-12">
              <span className="material-symbols-outlined text-3xl">architecture</span>
              <h1 className="font-headline text-2xl font-extrabold tracking-tight">The Fluid Architect</h1>
            </div>
            <div className="space-y-6">
              <h2 className="font-headline text-4xl font-bold leading-tight text-white">
                Cura tu obra maestra<br />digital.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-xs">
                Bienvenido de vuelta a tu panel. Claridad editorial de alto nivel para tus datos mas complejos.
              </p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10 bg-white/20 flex items-center justify-center text-white text-sm font-bold">A</div>
              <div className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10 bg-white/20 flex items-center justify-center text-white text-sm font-bold">B</div>
              <div className="w-10 h-10 rounded-full border-2 border-primary ring-2 ring-white/10 bg-white/20 flex items-center justify-center text-white text-sm font-bold">C</div>
            </div>
            <span className="text-sm font-medium text-white/90">Unete a 4k+ Curadores</span>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Right: Login Form */}
        <div className="bg-surface-container-lowest p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Bienvenido de nuevo</h3>
            <p className="text-on-surface-variant">Ingresa tus credenciales para acceder a tu estudio.</p>
          </div>
          <LoginForm />
          <div className="mt-12 text-center">
            <div className="mt-8 pt-8 flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-outline">
              <span>Politica de Privacidad</span>
              <span className="w-1 h-1 bg-outline-variant rounded-full" />
              <span>Terminos de Servicio</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
