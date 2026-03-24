"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, MessageSquare, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const conceptIcons = [Lightbulb, MessageSquare, Rocket]

export default function WhatIsVibeCoding() {
  const { t } = useLanguage()
  const p = t.whatIsVibeCoding

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="prose max-w-none space-y-0">
        <h2>{p.oldVsNewTitle}</h2>
        <p>{p.oldVsNewP1}</p>
        <p>
          <strong>{p.oldVsNewP2Strong}</strong>{p.oldVsNewP2Rest}
        </p>
        <h2>{p.exampleTitle}</h2>
        <p>{p.exampleIntro}</p>
      </div>

      {/* Before/After comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="rounded-xl border border-red-100 bg-red-50 p-5">
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3">{p.beforeLabel}</p>
          <div className="bg-white rounded-lg p-3 font-mono text-xs text-slate-700 leading-relaxed">
            <p className="text-slate-400">{p.beforeComment}</p>
            <p>const Blog = () =&gt; &#123;</p>
            <p>&nbsp;&nbsp;const [posts, setPosts] =</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;useState([]);</p>
            <p>&nbsp;&nbsp;useEffect(() =&gt; &#123;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;fetch(&apos;/api/posts&apos;)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(r =&gt; r.json())</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(setPosts);</p>
            <p>&nbsp;&nbsp;&#125;, []);</p>
            <p>&nbsp;&nbsp;return (...);</p>
            <p>&#125;</p>
          </div>
          <p className="text-xs text-red-600 mt-3">{p.beforeFootnote}</p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-3">{p.afterLabel}</p>
          <div className="bg-white rounded-lg p-3 text-sm text-slate-700 leading-relaxed italic">
            {p.afterPrompt}
          </div>
          <p className="text-xs text-green-600 mt-3">{p.afterFootnote}</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2>{p.vibeTitle}</h2>
        <p>{p.vibeP1}</p>
        <p>{p.vibeP2}</p>
        <ul>
          {p.vibeBullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <p>{p.vibeP3}</p>
        <h2>{p.stillNeedTitle}</h2>
        <p>{p.stillNeedP1}</p>
      </div>

      {/* Key concepts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {p.concepts.map((item, i) => {
          const Icon = conceptIcons[i]
          return (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          )
        })}
      </div>

      <div className="prose max-w-none">
        <p>{p.closingP}</p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg">
          <Link href="/vibe-coding-bootcamp/what-is-vibe-coding/what-is-code">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/vibe-coding-bootcamp/what-is-vibe-coding/the-full-stack">
            {p.skipBtn}
          </Link>
        </Button>
      </div>
    </div>
  )
}
