"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { VendorCards, type Vendor } from "@/components/interactive/VendorCards"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const vendorMeta: Pick<Vendor, "requiresCLI" | "free" | "url" | "recommended">[] = [
  { requiresCLI: false, free: true, url: "https://cursor.com", recommended: true },
  { requiresCLI: true, free: false, url: "https://claude.ai/code" },
  { requiresCLI: false, free: true, url: "https://codeium.com/windsurf" },
  { requiresCLI: false, free: true, url: "https://lovable.dev" },
  { requiresCLI: false, free: true, url: "https://v0.dev" },
]

export default function AIAgents() {
  const { t } = useLanguage()
  const p = t.aiAgents

  const agents: Vendor[] = p.vendors.map((v, i) => ({ ...v, ...vendorMeta[i] }))

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
        <h2>{p.whatIsTitle}</h2>
        <p>{p.whatIsP1}</p>
        <p>{p.whatIsP2}</p>
        <h2>{p.cliTitle}</h2>
        <p>{p.cliP}</p>
      </div>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <span className="font-semibold text-slate-900 text-sm">{p.noCliLabel}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{p.noCliDesc}</p>
          <p className="text-xs text-slate-400 mt-3">{p.noCliNote}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-xs font-mono">$</span>
            </div>
            <span className="font-semibold text-slate-900 text-sm">{p.cliLabel}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{p.cliDesc}</p>
          <p className="text-xs text-slate-400 mt-3">{p.cliNote}</p>
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <h2>{p.compareTitle}</h2>
        <p>{p.compareP}</p>
      </div>

      <VendorCards vendors={agents} />

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/what-is-vibe-coding/the-full-stack">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/toolbox/source-control">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
