"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { StackDiagram } from "@/components/interactive/StackDiagram"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function TheFullStack() {
  const { t } = useLanguage()
  const p = t.theFullStack

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
        <h2>{p.whyTitle}</h2>
        <p>{p.whyP1}</p>
        <p>{p.whyP2}</p>
      </div>

      <div className="my-10">
        <StackDiagram />
      </div>

      <div className="prose max-w-none">
        <h2>{p.pipelineTitle}</h2>
        <p>{p.pipelineIntro}</p>
        <ol>
          {p.pipelineSteps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p>{p.pipelineClose}</p>
        <h2>{p.stackTitle}</h2>
        <p>{p.stackIntro}</p>
      </div>

      <div className="my-8 grid grid-cols-1 gap-3">
        {p.stackItems.map((item) => (
          <div key={item.step} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-2xl font-bold text-slate-200 w-10 shrink-0">{item.step}</div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 uppercase tracking-wide">{item.role}</p>
              <p className="font-semibold text-slate-900">{item.tool}</p>
            </div>
            <p className="text-sm text-slate-500 text-right hidden sm:block max-w-xs">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="prose max-w-none">
        <p>{p.closingP}</p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/vibe-coding-bootcamp/what-is-vibe-coding/what-is-code">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/vibe-coding-bootcamp/toolbox/ai-agents">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
