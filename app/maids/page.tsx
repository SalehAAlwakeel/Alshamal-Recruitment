import { getMaids } from "@/lib/data";
import MaidsClient from "@/components/MaidsClient";

export default async function MaidsPage() {
  const maids = await getMaids();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Foreground content on shared background */}
      <div className="relative z-10">
        <MaidsClient initialMaids={maids} />
      </div>
    </section>
  );
}

