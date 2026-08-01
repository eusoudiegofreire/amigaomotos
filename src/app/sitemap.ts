import type { MetadataRoute } from "next";

// TODO: mesmo domínio configurado em layout.tsx
const SITE_URL = "https://amigaomotos.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
