"use server";

import { nanoid } from "nanoid";
import { createLead } from "@/lib/data";
import type { Lead } from "@/types/lead";

export async function submitLead(data: {
  maidId: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  const lead: Lead = {
    id: nanoid(),
    maidId: data.maidId,
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    createdAt: new Date().toISOString(),
  };

  await createLead(lead);
  return { success: true };
}

