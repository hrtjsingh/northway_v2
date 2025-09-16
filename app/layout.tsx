import type React from "react"
import type { Metadata } from "next"
import { getSeoConfig } from "@/lib/server/seo"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ConfigProvider } from "@/lib/store/config"
import ConfigGate from "@/components/ConfigGate"

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfig()
  const baseUrl = seo.url?.replace(/\/$/, "") || "https://northwayvisa.com"
  const title = `${seo.name} - ${seo.title}`
  return {
    metadataBase: new URL(baseUrl),
    title,
    description: seo.description,
    applicationName: seo.name,
    icons: {
      icon: seo.logo || "/logo.svg",
    },
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      siteName: seo.name,
      title,
      description: seo.description,
      images: [
        {
          url: seo.longLogo || "/long_logo.svg",
          width: 1200,
          height: 630,
          alt: `${seo.name} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description,
      images: [seo.longLogo || "/long_logo.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={false}
            storageKey="immigration-theme"
          >
            {/* Organization + WebSite JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "Northway Immigration & Visa",
                  url: "https://northwayvisa.com",
                  logo: "/logo.svg",
                }),
              }}
            />
            <ConfigProvider>
              <ConfigGate>{children}</ConfigGate>
            </ConfigProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
