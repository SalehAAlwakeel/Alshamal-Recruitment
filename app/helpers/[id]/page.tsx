import { notFound } from "next/navigation";
import { getMaidById, getMaids } from "@/lib/data";
import { getMaidDisplayId } from "@/lib/utils";
import MaidDetailContent from "@/components/MaidDetailContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface HelperDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: HelperDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Helper Profile | Shamal Recruitment Office`,
    alternates: { canonical: `/helpers/${id}` },
  };
}

export default async function HelperDetailPage({
  params,
}: HelperDetailPageProps) {
  const { id } = await params;
  const maid = await getMaidById(id);

  if (!maid) {
    notFound();
  }

  const allMaids = await getMaids();
  const maidDisplayId = getMaidDisplayId(maid, allMaids);

  return <MaidDetailContent maid={maid} maidDisplayId={maidDisplayId} />;
}

