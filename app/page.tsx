"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, GitBranch, Globe, Bot, ArrowRight, GitFork } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const featureIcons = [Bot, GitBranch, Globe]

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="bg-gradient-to-b from-violet-50 to-white border-b border-slate-100 px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            {t.home.heroBadge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {t.home.heroTitle1}
            <br />
            <span className="text-violet-600">{t.home.heroTitle2}</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            {t.home.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/what-is-vibe-coding">
                {t.home.startLearning} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/fork-this-app">
                <GitFork className="w-4 h-4" /> {t.home.forkThisApp}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* What you'll learn */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.home.whatYoullLearn}</h2>
          <p className="text-slate-500 mb-8">{t.home.whatYoullLearnSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.home.features.map((f, i) => {
              const Icon = featureIcons[i]
              return (
                <Card key={f.title}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Who this is for */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.home.whoIsThisFor}</h2>
          <p className="text-slate-500 mb-8">{t.home.whoIsThisForSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.home.tracks.map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="rounded-xl border border-slate-200 p-5 bg-white hover:border-violet-300 hover:shadow-md transition-all group"
              >
                <div className="text-2xl mb-3">{track.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors">
                  {track.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{track.description}</p>
                <div className="flex items-center gap-1 mt-3 text-violet-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.home.startHere} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Meta callout */}
        <section className="bg-slate-900 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t.home.metaTitle}</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                {t.home.metaDescription}
              </p>
              <Button asChild variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Link href="/fork-this-app">
                  <GitFork className="w-3.5 h-3.5" /> {t.home.metaCta}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
