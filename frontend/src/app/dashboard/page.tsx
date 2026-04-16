"use client";

import AuthenticatedLayout from "@/features/shared/components/AuthenticatedLayout";

export default function DashboardPage() {
  return (
    <AuthenticatedLayout>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">Panel Principal</h1>
        <p className="text-on-surface-variant mt-2 text-lg">Gestiona tu vision arquitectonica y activos digitales.</p>
      </div>

      {/* Central Content Area */}
      <div className="flex-grow flex items-center justify-center relative min-h-[400px]">
        {/* Background Decorative */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-fixed-dim/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-fixed/10 blur-[100px] rounded-full" />
        </div>

        {/* Dashboard Placeholder Card */}
        <div className="bg-surface-container-lowest rounded-[2rem] p-12 max-w-2xl w-full text-center ambient-shadow border border-outline-variant/10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/10 text-primary mb-8">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              construction
            </span>
          </div>
          <h2 className="text-sm font-bold text-on-surface font-headline uppercase tracking-widest opacity-60 mb-4">
            Estado Actual
          </h2>
          <p className="text-3xl font-medium text-on-surface-variant font-body mb-8 italic">
            &quot;dashboard en desarrollo...&quot;
          </p>
          <div className="flex flex-col gap-4 items-center">
            <div className="h-1.5 w-48 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary w-2/3 rounded-full" />
            </div>
            <span className="text-sm font-semibold text-primary font-label">
              Base Arquitectonica 65% Completada
            </span>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-surface-container-low rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-surface-bright group">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-sky-600 bg-white p-2 rounded-lg">auto_awesome</span>
            <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-on-surface font-bold text-lg mb-1">Flujo de Curacion</h3>
          <p className="text-on-surface-variant text-sm">La eficiencia del sistema esta en su punto maximo.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-surface-bright group">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-sky-600 bg-white p-2 rounded-lg">data_exploration</span>
          </div>
          <h3 className="text-on-surface font-bold text-lg mb-1">Metricas Fluidas</h3>
          <p className="text-on-surface-variant text-sm">Esperando flujos de telemetria entrantes.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:bg-surface-bright group">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-secondary bg-white p-2 rounded-lg">verified</span>
          </div>
          <h3 className="text-on-surface font-bold text-lg mb-1">Integridad Central</h3>
          <p className="text-on-surface-variant text-sm">Protocolos de identidad verificados y activos.</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
