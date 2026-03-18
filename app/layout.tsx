import type { Metadata } from "next"
import "./globals.css"
import { MainLayout } from "@/components/layout/MainLayout"
import { LanguageProvider } from "@/lib/i18n/LanguageContext"

export const metadata: Metadata = {
  title: "Vibe Coding Bootcamp",
  description: "Build your idea. No coding experience needed.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          <MainLayout>{children}</MainLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
