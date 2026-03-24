import { MainLayout } from "@/components/layout/MainLayout"
import { LanguageProvider } from "@/lib/i18n/LanguageContext"

export default function BootcampLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <MainLayout>{children}</MainLayout>
    </LanguageProvider>
  )
}
