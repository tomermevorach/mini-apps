import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mini Apps",
  description: "A collection of mini apps.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
