import type { MetadataRoute } from "next";

const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${origin}/`, priority: 1 },
    { url: `${origin}/docs`, priority: 0.8 },
  ];
}
