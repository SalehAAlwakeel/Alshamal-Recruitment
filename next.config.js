/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.SUPABASE_URL
let supabaseHostname = null
try {
  if (supabaseUrl) supabaseHostname = new URL(supabaseUrl).hostname
} catch {}

const nextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
    unoptimized: false,
  },
}

module.exports = nextConfig

