import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminMaidsPage() {
  await requireAuth();
  redirect("/admin/helpers");
}

