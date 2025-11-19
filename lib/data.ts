import { promises as fs } from "fs";
import path from "path";
import type { Maid } from "@/types/maid";
import type { Lead } from "@/types/lead";

const dataDir = path.join(process.cwd(), "data");
const maidsFile = path.join(dataDir, "maids.json");
const leadsFile = path.join(dataDir, "leads.json");

// Simple queue to prevent concurrent file writes
let writeQueue: Promise<void> = Promise.resolve();

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Maids operations
export async function getMaids(): Promise<Maid[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(maidsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getMaidById(id: string): Promise<Maid | null> {
  const maids = await getMaids();
  return maids.find((m) => m.id === id) || null;
}

export async function saveMaids(maids: Maid[]): Promise<void> {
  await ensureDataDir();
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(maidsFile, JSON.stringify(maids, null, 2), "utf-8");
  });
  await writeQueue;
}

export async function createMaid(maid: Maid): Promise<void> {
  const maids = await getMaids();
  maids.push(maid);
  await saveMaids(maids);
}

export async function updateMaid(id: string, maid: Partial<Maid>): Promise<void> {
  const maids = await getMaids();
  const index = maids.findIndex((m) => m.id === id);
  if (index === -1) {
    throw new Error("Maid not found");
  }
  maids[index] = { ...maids[index], ...maid };
  await saveMaids(maids);
}

export async function deleteMaid(id: string): Promise<void> {
  const maids = await getMaids();
  const filtered = maids.filter((m) => m.id !== id);
  await saveMaids(filtered);
}

// Leads operations
export async function getLeads(): Promise<Lead[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(leadsFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function createLead(lead: Lead): Promise<void> {
  const leads = await getLeads();
  leads.push(lead);
  await ensureDataDir();
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
  });
  await writeQueue;
}

