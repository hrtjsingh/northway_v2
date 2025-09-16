import type { MetadataRoute } from "next"
import { getSeoConfig } from "@/lib/server/seo"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoConfig()
  const base = seo.url?.replace(/\/$/, "") || "https://northwayvisa.com"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  }
}


