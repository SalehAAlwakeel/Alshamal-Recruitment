import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.shamalsaudi.com/sitemap.xml",
    host: "https://www.shamalsaudi.com",
  };
}



