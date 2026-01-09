import { createClient } from "@supabase/supabase-js";

// Supabase Project URL is NOT a secret. We can safely hardcode it as a fallback
// so Vercel env var propagation issues don't break the entire admin site.
const FALLBACK_SUPABASE_URL = "https://wcthffgiqvtomzhxybct.supabase.co";

function requireAnyEnv(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`${names[0]} is not set`);
}

let cachedAdminClient: ReturnType<typeof createClient<any>> | null = null;

export function getSupabaseAdmin() {
  // Lazy init so `next build` doesn't crash by evaluating env vars at import-time.
  if (cachedAdminClient) return cachedAdminClient;

  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_PROJECT_URL ||
    FALLBACK_SUPABASE_URL;
  const serviceKey = requireAnyEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_KEY",
  ]);

  // Note: we intentionally use `any` here to avoid build-time type errors
  // without generating Supabase Database types.
  cachedAdminClient = createClient<any>(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedAdminClient;
}

export const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || "maid-photos";


