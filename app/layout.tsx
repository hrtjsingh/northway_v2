import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Northway - Immigration & Visa Agency",
  description:
    "Expert immigration and visa services to help you achieve your dreams of studying and living abroad. Professional guidance for students and professionals worldwide.",
  keywords: ["immigration", "visa", "study abroad", "student visa", "immigration consultant", "visa agency"],
  icons: {
    icon: "/logo.svg",
  },
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
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
