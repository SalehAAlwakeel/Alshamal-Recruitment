import { getMaids } from "@/lib/data";
import MaidsClient from "@/components/MaidsClient";
import type { Maid } from "@/types/maid";

export const dynamic = "force-dynamic";

export default async function MaidsPage() {
  let maids: Maid[] = [];
  try {
    maids = await getMaids();
  } catch (err: any) {
    // Don't crash the whole site if Supabase isn't configured yet.
    console.error("MaidsPage error:", err);
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Foreground content on shared background */}
      <div className="relative z-10">
        <MaidsClient initialMaids={maids} />
      </div>
    </section>
  );
}

