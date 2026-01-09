import { createClient } from "@supabase/supabase-js";

function requireAnyEnv(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`${names[0]} is not set`);
}

let cachedAdminClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  // Lazy init so `next build` doesn't crash by evaluating env vars at import-time.
  if (cachedAdminClient) return cachedAdminClient;

  const url = requireAnyEnv(["SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"]);
  const serviceKey = requireAnyEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
  ]);

  cachedAdminClient = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedAdminClient;
}

export const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || "maid-photos";


