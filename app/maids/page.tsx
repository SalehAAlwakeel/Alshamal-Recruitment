import { getMaids } from "@/lib/data";
import MaidsClient from "@/components/MaidsClient";

export default async function MaidsPage() {
  const maids = await getMaids();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 opacity-90" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary-500/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.12),_transparent_55%)]" />

      {/* Foreground content */}
      <div className="relative z-10">
        <MaidsClient initialMaids={maids} />
      </div>
    </section>
  );
}

