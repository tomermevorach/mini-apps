"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const difficultyColor = (d: string) => {
  if (d === "Beginner") return "success" as const
  if (d === "Intermediate") return "warning" as const
  return "secondary" as const
}

export default function GoDeeper() {
  const { t } = useLanguage()
  const p = t.goDeeper

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="prose max-w-none mb-10">
        <p>{p.intro1}</p>
        <p>{p.intro2}</p>
      </div>

      <div className="space-y-12">
        {p.topics.map((section) => (
          <div key={section.category}>
            <h2 className="text-xl font-bold text-slate-900 mb-5">{section.category}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 p-5 bg-white">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <Badge variant={difficultyColor(item.difficulty)} className="shrink-0">
                      {item.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  {"resource" in item && item.resource && (
                    <p className="text-xs text-violet-600 mt-2">→ {item.resource}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/fork-this-app">
            <ArrowLeft className="w-4 h-4" /> {p.backBtn}
          </Link>
        </Button>
      </div>
    </div>
  )
}
