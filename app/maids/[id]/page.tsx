import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface MaidDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MaidDetailPage({ params }: MaidDetailPageProps) {
  const { id } = await params;
  redirect(`/helpers/${id}`);
}

