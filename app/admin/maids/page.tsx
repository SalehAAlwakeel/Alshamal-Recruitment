import { requireAuth } from "@/lib/auth";
import { getMaids } from "@/lib/data";
import AdminMaidsClient from "@/components/AdminMaidsClient";

export const dynamic = "force-dynamic";

export default async function AdminMaidsPage() {
  await requireAuth();
  const maids = await getMaids();

  return <AdminMaidsClient initialMaids={maids} />;
}

