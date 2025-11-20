export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient, matching hero section */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900" />

      {/* Highlight light at the top */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_55%)]" />
    </div>
  );
}

