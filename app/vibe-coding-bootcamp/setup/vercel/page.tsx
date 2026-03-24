"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { SetupChecklist } from "@/components/interactive/SetupChecklist"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function SetupVercel() {
  const { t } = useLanguage()
  const p = t.setupVercel

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2>{p.beforeTitle}</h2>
        <p>{p.beforeP}</p>
      </div>

      <SetupChecklist storageKey="setup-vercel" steps={p.steps} />

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/vibe-coding-bootcamp/setup/github">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/vibe-coding-bootcamp/setup/coding-agent">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
