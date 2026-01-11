import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isSet(name: string) {
  return Boolean(process.env[name] && String(process.env[name]).trim().length > 0);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    vercel: {
      VERCEL: process.env.VERCEL || null,
      VERCEL_ENV: process.env.VERCEL_ENV || null,
      VERCEL_URL: process.env.VERCEL_URL || null,
      VERCEL_REGION: process.env.VERCEL_REGION || null,
      VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID || null,
      VERCEL_GIT_PROVIDER: process.env.VERCEL_GIT_PROVIDER || null,
      VERCEL_GIT_REPO_OWNER: process.env.VERCEL_GIT_REPO_OWNER || null,
      VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG || null,
      VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || null,
    },
    // Only presence flags (no secret values)
    env: {
      SUPABASE_URL: isSet("SUPABASE_URL"),
      NEXT_PUBLIC_SUPABASE_URL: isSet("NEXT_PUBLIC_SUPABASE_URL"),
      SUPABASE_STORAGE_BUCKET: isSet("SUPABASE_STORAGE_BUCKET"),
      SUPABASE_ANON_KEY: isSet("SUPABASE_ANON_KEY"),
      SUPABASE_SERVICE_ROLE_KEY: isSet("SUPABASE_SERVICE_ROLE_KEY"),
      SUPABASE_SECRET_KEY: isSet("SUPABASE_SECRET_KEY"),
      SUPABASE_SERVICE_KEY: isSet("SUPABASE_SERVICE_KEY"),
      ADMIN_PASSWORD: isSet("ADMIN_PASSWORD"),
    },
  });
}


