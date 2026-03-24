"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Zap } from "lucide-react"
import { SetupChecklist } from "@/components/interactive/SetupChecklist"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function ForkThisApp() {
  const { t } = useLanguage()
  const p = t.forkThisApp

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 mb-10 text-white">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{p.metaTitle}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{p.metaDesc}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2>{p.fullLoopTitle}</h2>
        <p>{p.fullLoopIntro}</p>
        <ol>
          {p.fullLoopPhases.map((phase) => (
            <li key={phase.label}><strong>{phase.label}</strong> — {phase.desc}</li>
          ))}
        </ol>
        <p>{p.fullLoopClose}</p>
      </div>

      <div className="mt-10 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0">1</div>
          <h2 className="text-xl font-bold text-slate-900">{p.phase1Title}</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 ms-10">{p.phase1Subtitle}</p>
        <SetupChecklist storageKey="fork-phase-1" steps={p.forkSteps} />
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0">2</div>
          <h2 className="text-xl font-bold text-slate-900">{p.phase2Title}</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 ms-10">{p.phase2Subtitle}</p>
        <SetupChecklist storageKey="fork-phase-2" steps={p.localSteps} />

        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-900 text-sm mb-1">{p.localhostTitle}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{p.localhostDesc}</p>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0">3</div>
          <h2 className="text-xl font-bold text-slate-900">{p.phase3Title}</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 ms-10">{p.phase3Subtitle}</p>
        <SetupChecklist storageKey="fork-phase-3" steps={p.iterateSteps} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="font-semibold text-slate-900 mb-3">{p.ideasTitle}</h3>
        <p className="text-sm text-slate-600 mb-4">{p.ideasIntro}</p>
        <ul className="space-y-2">
          {p.ideas.map((idea) => (
            <li key={idea} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-violet-400 mt-0.5 shrink-0">→</span>
              <span className="italic">&ldquo;{idea}&rdquo;</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/vibe-coding-bootcamp/setup/coding-agent">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/vibe-coding-bootcamp/go-deeper">
            {p.goDeeper} <ExternalLink className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
