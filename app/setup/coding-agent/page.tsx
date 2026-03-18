"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { SetupChecklist } from "@/components/interactive/SetupChecklist"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function SetupCodingAgent() {
  const { t } = useLanguage()
  const p = t.setupCodingAgent

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border-2 border-violet-300 ring-1 ring-violet-200 p-5 bg-violet-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-900">{p.cursorLabel}</span>
            <Badge variant="default">{p.cursorBadge}</Badge>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{p.cursorDesc}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-900">{p.claudeLabel}</span>
            <Badge variant="secondary">{p.claudeBadge}</Badge>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{p.claudeDesc}</p>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-900">{p.optionATitle}</h2>
          <Badge variant="default">{t.common.recommended}</Badge>
        </div>
        <SetupChecklist storageKey="setup-cursor" steps={p.cursorSteps} />
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-900">{p.optionBTitle}</h2>
          <Badge variant="secondary">{p.claudeBadge}</Badge>
        </div>
        <p className="text-sm text-slate-500 mb-6">{p.optionBNote}</p>
        <SetupChecklist storageKey="setup-claude-code" steps={p.claudeSteps} />
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/setup/vercel">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/fork-this-app">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
