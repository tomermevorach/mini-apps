"use client"

import { useState, useEffect } from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export type ChecklistStep = {
  id: string
  title: string
  description: string
  details?: string
  code?: string
}

interface SetupChecklistProps {
  storageKey: string
  steps: ChecklistStep[]
}

export function SetupChecklist({ storageKey, steps }: SetupChecklistProps) {
  const { t } = useLanguage()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState<string | null>(steps[0]?.id ?? null)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) setChecked(JSON.parse(stored))
  }, [storageKey])

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const completed = Object.values(checked).filter(Boolean).length
  const progress = Math.round((completed / steps.length) * 100)

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{t.common.stepsCompleted(completed, steps.length)}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const isDone = checked[step.id]
          const isExpanded = expanded === step.id
          return (
            <div
              key={step.id}
              className={cn(
                "rounded-xl border transition-all",
                isDone ? "border-green-200 bg-green-50" : "border-slate-200 bg-white"
              )}
            >
              {/* Step header */}
              <div
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : step.id)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(step.id)
                  }}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                    isDone
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-slate-300 hover:border-violet-400"
                  )}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : null}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">{t.common.step} {i + 1}</span>
                  </div>
                  <p className={cn(
                    "text-sm font-medium",
                    isDone ? "text-green-700 line-through decoration-green-400" : "text-slate-800"
                  )}>
                    {step.title}
                  </p>
                </div>

                <span className="text-xs text-slate-400">{isExpanded ? "▲" : "▼"}</span>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed mt-3">
                    {step.description}
                  </p>
                  {step.details && (
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{step.details}</p>
                  )}
                  {step.code && (
                    <div className="mt-3 bg-slate-900 rounded-lg p-3 flex items-center justify-between gap-3">
                      <code className="text-sm text-green-400 font-mono">{step.code}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(step.code!)}
                        className="text-xs text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        {t.common.copy}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
