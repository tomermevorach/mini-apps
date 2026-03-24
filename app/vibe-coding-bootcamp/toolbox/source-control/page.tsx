"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function SourceControl() {
  const { t } = useLanguage()
  const p = t.sourceControl

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="prose max-w-none">
        <h2>{p.problemTitle}</h2>
        <p>{p.problemP1}</p>
        <p>{p.problemP2}</p>
        <h2>{p.gitVsGithubTitle}</h2>
        <p>{p.gitVsGithubIntro}</p>
      </div>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900 mb-2">{p.gitTitle}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{p.gitDesc}</p>
          <p className="text-xs text-slate-400 mt-3">{p.gitNote}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900 mb-2">{p.githubTitle}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{p.githubDesc}</p>
          <p className="text-xs text-slate-400 mt-3">{p.githubNote}</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2>{p.conceptsTitle}</h2>
        <ul>
          {p.concepts.map((c) => (
            <li key={c.term}><strong>{c.term}</strong> — {c.def}</li>
          ))}
        </ul>
        <p>{p.conceptsClose}</p>
        <h2>{p.whichTitle}</h2>
        <p>{p.whichP}</p>
      </div>

      <div className="my-6 space-y-3">
        {p.vendors.map((v) => (
          <div
            key={v.name}
            className={`rounded-xl border p-5 bg-white ${v.recommended ? "border-violet-300 ring-1 ring-violet-200" : "border-slate-200"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-slate-900">{v.name}</span>
              {v.recommended && <Badge variant="default">{t.common.useThisOne}</Badge>}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/vibe-coding-bootcamp/toolbox/ai-agents">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/vibe-coding-bootcamp/toolbox/cloud-hosting">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
