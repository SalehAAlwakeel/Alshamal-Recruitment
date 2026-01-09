import { createClient } from "@supabase/supabase-js";

function requireAnyEnv(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`${names[0]} is not set`);
}

export const supabaseAdmin = createClient(
  requireAnyEnv(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]),
  requireAnyEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
  ]),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || "maid-photos";


