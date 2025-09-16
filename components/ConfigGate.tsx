"use client"

import type React from "react"
import { useSiteConfig } from "@/lib/store/config"
import FullScreenLoader from "@/components/FullScreenLoader"

export default function ConfigGate({ children }: { children: React.ReactNode }) {
  const { loading } = useSiteConfig()
  return (
    <>
      {loading && <FullScreenLoader />}
      {children}
    </>
  )
}


