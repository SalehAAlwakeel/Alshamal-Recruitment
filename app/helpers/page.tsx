import { getMaids } from "@/lib/data";
import MaidsClient from "@/components/MaidsClient";
import type { Maid } from "@/types/maid";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse Helpers | Shamal Recruitment Office",
  description:
    "Browse available helpers and submit an inquiry. Professional domestic help services across Saudi Arabia.",
  alternates: { canonical: "/helpers" },
};

export default async function HelpersPage() {
  let maids: Maid[] = [];
  try {
    maids = await getMaids();
  } catch (err: any) {
    // Don't crash the whole site if Supabase isn't configured yet.
    console.error("HelpersPage error:", err);
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

