"use client"

import { useState } from "react"
import { Laptop, Github, Triangle, Globe, ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const steps = [
  {
    id: "editor",
    icon: Laptop,
    label: "Your Computer",
    sublabel: "Code Editor",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    activeColor: "bg-violet-600 text-white border-violet-700",
    detail: {
      title: "Your Computer (Code Editor)",
      description:
        "This is where you write code — or describe what you want to an AI agent and let it write for you. Think of it as your workspace. Popular tools: Cursor, Claude Code, Windsurf.",
      example: "You type: 'Build me a blog homepage with a dark theme'",
    },
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    sublabel: "Source Control",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    activeColor: "bg-slate-800 text-white border-slate-900",
    detail: {
      title: "GitHub (Source Control)",
      description:
        "GitHub is like Google Drive for code. It stores every version of your code so you can go back in time, collaborate with others, and never lose your work.",
      example: "You push your code: 'git push' → GitHub saves a snapshot",
    },
  },
  {
    id: "vercel",
    icon: Triangle,
    label: "Vercel",
    sublabel: "Cloud Hosting",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    activeColor: "bg-blue-600 text-white border-blue-700",
    detail: {
      title: "Vercel (Cloud Hosting)",
      description:
        "Vercel watches your GitHub repository. The moment you push new code, Vercel automatically builds and publishes your app to the internet. Zero manual steps.",
      example: "You push to GitHub → Vercel detects it → your site updates in ~30 seconds",
    },
  },
  {
    id: "web",
    icon: Globe,
    label: "The Web",
    sublabel: "yourapp.com",
    color: "bg-green-100 text-green-700 border-green-200",
    activeColor: "bg-green-600 text-white border-green-700",
    detail: {
      title: "The Web (Live App)",
      description:
        "Your app is now live on the internet with a real URL. Anyone in the world can visit it. This is the finish line — and with vibe coding, you can get here in hours, not months.",
      example: "yourapp.vercel.app — share it with anyone",
    },
  },
]

export function StackDiagram() {
  const { t } = useLanguage()
  const [active, setActive] = useState<string | null>(null)
  const activeStep = steps.find((s) => s.id === active)

  return (
    <div className="space-y-6">
      {/* Diagram */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
        {steps.map((step, i) => {
          const Icon = step.icon
          const isActive = active === step.id
          return (
            <div key={step.id} className="flex flex-col sm:flex-row items-center">
              <button
                onClick={() => setActive(isActive ? null : step.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-32 cursor-pointer",
                  isActive ? step.activeColor : step.color,
                  "hover:scale-105 active:scale-95"
                )}
              >
                <Icon className="w-7 h-7" />
                <div className="text-center">
                  <p className="font-semibold text-sm leading-tight">{step.label}</p>
                  <p className={cn("text-xs mt-0.5", isActive ? "opacity-80" : "opacity-60")}>
                    {step.sublabel}
                  </p>
                </div>
              </button>

              {i < steps.length - 1 && (
                <div className="flex items-center my-1 sm:my-0 sm:mx-1 text-slate-300">
                  <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs text-slate-400">{t.common.clickToLearn}</p>

      {/* Detail panel */}
      {activeStep && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 relative">
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
          <h4 className="font-semibold text-slate-900 mb-2">{activeStep.detail.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {activeStep.detail.description}
          </p>
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">{t.common.example}</p>
            <p className="text-sm text-slate-700 font-medium">{activeStep.detail.example}</p>
          </div>
        </div>
      )}
    </div>
  )
}
