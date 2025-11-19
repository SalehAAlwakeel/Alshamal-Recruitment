import type { Maid } from "@/types/maid";

// Helper function to get Maid ID (MAID0001, MAID0002, etc.)
// Uses stored maidId if available, otherwise falls back to index-based calculation
export function getMaidDisplayId(maid: Maid, allMaids: Maid[]): string {
  // If maid has a stored maidId, use it
  if (maid.maidId) {
    return maid.maidId;
  }
  
  // Fallback to index-based calculation for backward compatibility
  const index = allMaids.findIndex((m) => m.id === maid.id);
  if (index === -1) return "MAID0000";
  const maidNumber = (index + 1).toString().padStart(4, "0");
  return `MAID${maidNumber}`;
}

// Generate next available maid ID
export function generateNextMaidId(allMaids: Maid[]): string {
  // Find the highest existing maidId
  let maxNumber = 0;
  for (const maid of allMaids) {
    if (maid.maidId) {
      const match = maid.maidId.match(/MAID(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNumber) {
          maxNumber = num;
        }
      }
    }
  }
  
  // Return next ID
  const nextNumber = maxNumber + 1;
  return `MAID${nextNumber.toString().padStart(4, "0")}`;
}

