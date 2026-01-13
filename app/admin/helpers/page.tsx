import { requireAuth } from "@/lib/auth";
import { getMaids } from "@/lib/data";
import AdminMaidsClient from "@/components/AdminMaidsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminHelpersPage() {
  await requireAuth();

  // If someone still visits the old URL, they should end up here.
  // (We also handle this in middleware, but keeping it here is harmless.)
  // eslint-disable-next-line no-constant-condition
  if (false) {
    redirect("/admin/helpers");
  }

  try {
    const maids = await getMaids();
    return <AdminMaidsClient initialMaids={maids} />;
  } catch (err: any) {
    const message =
      err?.message ||
      "Failed to load helpers. Please check Supabase environment variables and tables.";
    console.error("AdminHelpersPage error:", err);

    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto rounded-3xl bg-primary-900/60 border border-primary-700/70 p-8 text-white">
            <h1 className="text-2xl font-extrabold mb-3">Admin Dashboard</h1>
            <p className="text-primary-100/90 mb-4">
              The admin dashboard could not load data from Supabase.
            </p>
            <div className="rounded-xl bg-black/30 border border-white/10 p-4 font-mono text-sm whitespace-pre-wrap">
              {message}
            </div>
            <p className="text-primary-100/80 mt-4 text-sm">
              Make sure Vercel has: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
              SUPABASE_ANON_KEY, SUPABASE_STORAGE_BUCKET and that Supabase tables{" "}
              <span className="font-mono">maids</span> and{" "}
              <span className="font-mono">leads</span> exist.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

