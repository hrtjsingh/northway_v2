"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
// Use a local type to avoid runtime dependency on static site-config
type FooterLink = { name: string; href: string }
type SocialLink = { name: string; href: string; icon: string }
export type SiteConfig = {
  name: string
  title: string
  description: string
  url?: string
  phone: string
  email: string
  address: string
  hours: string
  logo?: string
  longLogo?: string
  navigation?: FooterLink[]
  admin: { username: string; password: string }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    bg: string
    stats: { number: string; title: string; description: string }[]
  }
  about: { title: string; subtitle: string; description: string; features: string[] }
  services: { title: string; subtitle: string; description?: string; destinations: { title: string; description: string; icon: string }[] }
  visaService: { title: string; description: string; cta: string }
  countries: { name: string; description: string; image: string; flag: string }[]
  testimonials: { name: string; role: string; content: string; image: string; rating: number }[]
  contact: {
    title: string
    description: string
    form: { name: string; email: string; phone: string; service: string; message: string; submit: string }
    services: string[]
  }
  footer: { description: string; quickLinks: FooterLink[]; services: FooterLink[]; social: SocialLink[] }
}

type ConfigContextValue = {
  config: SiteConfig | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/config", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load config")
      const data = await res.json()
      setConfig(data as SiteConfig)
    } catch (e: any) {
      setError(e?.message || "Failed to load config")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const value = useMemo(
    () => ({ config, loading, error, refresh: fetchConfig }),
    [config, loading, error]
  )

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useSiteConfig() {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error("useSiteConfig must be used within a ConfigProvider")
  return ctx
}


