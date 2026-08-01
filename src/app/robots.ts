import type { MetadataRoute } from "next";

// TODO: mesmo domínio configurado em layout.tsx
const SITE_URL = "https://amigaomotos.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
