"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ExternalLink, Terminal, MousePointer } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export type Vendor = {
  name: string
  tagline: string
  description: string
  pros: string[]
  bestFor: string
  requiresCLI: boolean
  free: boolean
  url: string
  recommended?: boolean
}

interface VendorCardsProps {
  vendors: Vendor[]
}

export function VendorCards({ vendors }: VendorCardsProps) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {/* Filter row */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelected(null)}
          className={cn(
            "text-xs px-3 py-1.5 rounded-full border transition-colors",
            selected === null
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
          )}
        >
          {t.common.all}
        </button>
        <button
          onClick={() => setSelected("no-cli")}
          className={cn(
            "text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5",
            selected === "no-cli"
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
          )}
        >
          <MousePointer className="w-3 h-3" /> {t.common.noTerminalNeeded}
        </button>
        <button
          onClick={() => setSelected("cli")}
          className={cn(
            "text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5",
            selected === "cli"
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
          )}
        >
          <Terminal className="w-3 h-3" /> {t.common.terminalBased}
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors
          .filter((v) => {
            if (selected === "no-cli") return !v.requiresCLI
            if (selected === "cli") return v.requiresCLI
            return true
          })
          .map((vendor) => (
            <div
              key={vendor.name}
              className={cn(
                "rounded-xl border p-5 bg-white transition-shadow hover:shadow-md",
                vendor.recommended ? "border-violet-300 ring-1 ring-violet-200" : "border-slate-200"
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{vendor.name}</h3>
                    {vendor.recommended && (
                      <Badge variant="default">{t.common.recommended}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{vendor.tagline}</p>
                </div>
                <a
                  href={vendor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-violet-600 transition-colors mt-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {vendor.description}
              </p>

              {/* Pros */}
              <ul className="space-y-1 mb-4">
                {vendor.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={vendor.requiresCLI ? "secondary" : "success"}>
                  {vendor.requiresCLI ? (
                    <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> {t.common.needsTerminal}</span>
                  ) : (
                    <span className="flex items-center gap-1"><MousePointer className="w-3 h-3" /> {t.common.noTerminal}</span>
                  )}
                </Badge>
                {vendor.free && <Badge variant="outline">{t.common.freeTier}</Badge>}
                <span className="text-xs text-slate-400 ml-auto">{vendor.bestFor}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
