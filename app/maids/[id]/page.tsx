import { notFound } from "next/navigation";
import { getMaidById, getMaids } from "@/lib/data";
import { getMaidDisplayId } from "@/lib/utils";
import MaidDetailContent from "@/components/MaidDetailContent";

export const dynamic = "force-dynamic";

interface MaidDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MaidDetailPage({ params }: MaidDetailPageProps) {
  const { id } = await params;
  const maid = await getMaidById(id);

  if (!maid) {
    notFound();
  }

  const allMaids = await getMaids();
  const maidDisplayId = getMaidDisplayId(maid, allMaids);

  return <MaidDetailContent maid={maid} maidDisplayId={maidDisplayId} />;
}

