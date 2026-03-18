"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { LiveCodeEditor } from "@/components/interactive/LiveCodeEditor"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function WhatIsCode() {
  const { t } = useLanguage()
  const p = t.whatIsCode

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
        <h2>{p.instructionsTitle}</h2>
        <p>{p.instructionsP1}</p>
        <p>
          {p.instructionsP2Start}<strong>{p.instructionsP2Strong}</strong>
        </p>
        <h2>{p.tryItTitle}</h2>
        <p>{p.tryItP}</p>
      </div>

      <div className="my-8">
        <LiveCodeEditor />
      </div>

      <div className="prose max-w-none">
        <h2>{p.whatYouSawTitle}</h2>
        <p>
          {p.whatYouSawP1Start}<strong>{p.whatYouSawP1HTML}</strong>{p.whatYouSawP1Rest}
        </p>
        <p>{p.whatYouSawP2}</p>
      </div>

      <div className="my-8 bg-violet-50 border border-violet-200 rounded-xl p-6">
        <p className="text-violet-900 font-semibold text-lg mb-2">{p.insightTitle}</p>
        <p className="text-violet-700 leading-relaxed">{p.insightBody}</p>
      </div>

      <div className="prose max-w-none">
        <h2>{p.threeLanguagesTitle}</h2>
        <p>{p.threeLanguagesIntro}</p>
        <ul>
          {p.languages.map((lang) => (
            <li key={lang.name}>
              <strong>{lang.name}</strong> — {lang.desc}
            </li>
          ))}
        </ul>
        <p>{p.frameworkP}</p>
        <h2>{p.aiTitle}</h2>
        <p>{p.aiP1}</p>
        <p>{p.aiP2}</p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/what-is-vibe-coding">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/what-is-vibe-coding/the-full-stack">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
