import type { MetadataRoute } from "next"
import { getSeoConfig } from "@/lib/server/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeoConfig()
  const base = (seo.url || "https://northwayvisa.com").replace(/\/$/, "")
  const now = new Date().toISOString()
  const routes = [
    "",
    "/about",
    "/services",
    "/countries",
    "/contact",
    "/destinations",
  ]
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }))
}


