import type { Maid } from "@/types/maid";
import type { Lead } from "@/types/lead";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type MaidRow = {
  id: string; // uuid
  maid_id: string | null;
  name: string;
  age: number;
  nationality: string;
  eta_days: number;
  has_experience: boolean;
  years_experience: number | null;
  photos: string[];
  notes: string | null;
  created_at: string;
};

function mapRowToMaid(row: MaidRow): Maid {
  return {
    id: row.id,
    maidId: row.maid_id || undefined,
    name: row.name,
    age: row.age,
    nationality: row.nationality,
    etaDays: row.eta_days,
    hasExperience: row.has_experience,
    yearsExperience: row.years_experience ?? undefined,
    photos: row.photos || [],
    notes: row.notes ?? undefined,
  };
}

// Maids operations
export async function getMaids(): Promise<Maid[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("maids")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data as MaidRow[]).map(mapRowToMaid);
}

export async function getMaidById(id: string): Promise<Maid | null> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("maids")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapRowToMaid(data as MaidRow);
}

export async function createMaid(maid: Maid): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("maids").insert({
    maid_id: maid.maidId ?? null,
    name: maid.name,
    age: maid.age,
    nationality: maid.nationality,
    eta_days: maid.etaDays,
    has_experience: maid.hasExperience,
    years_experience: maid.yearsExperience ?? null,
    photos: maid.photos,
    notes: maid.notes ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateMaid(id: string, maid: Partial<Maid>): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const payload: Record<string, any> = {};
  if (maid.maidId !== undefined) payload.maid_id = maid.maidId;
  if (maid.name !== undefined) payload.name = maid.name;
  if (maid.age !== undefined) payload.age = maid.age;
  if (maid.nationality !== undefined) payload.nationality = maid.nationality;
  if (maid.etaDays !== undefined) payload.eta_days = maid.etaDays;
  if (maid.hasExperience !== undefined) payload.has_experience = maid.hasExperience;
  if (maid.yearsExperience !== undefined) payload.years_experience = maid.yearsExperience;
  if (maid.photos !== undefined) payload.photos = maid.photos;
  if (maid.notes !== undefined) payload.notes = maid.notes;

  const { error } = await supabaseAdmin.from("maids").update(payload).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteMaid(id: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("maids").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

// Leads operations
export async function getLeads(): Promise<Lead[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as any[]).map((row) => ({
    id: row.id,
    maidId: row.maid_id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    message: row.message ?? undefined,
    createdAt: row.created_at,
  })) as Lead[];
}

export async function createLead(lead: Lead): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from("leads").insert({
    id: lead.id,
    maid_id: lead.maidId,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? null,
    message: lead.message ?? null,
    created_at: lead.createdAt,
  });

  if (error) {
    throw new Error(error.message);
  }
}

