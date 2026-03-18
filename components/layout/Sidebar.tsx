"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import {
  Zap,
  Code2,
  Layers,
  Bot,
  GitBranch,
  Cloud,
  Github,
  Triangle,
  Download,
  GitFork,
  BookOpen,
  X,
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const nav = [
    {
      title: t.sidebar.gettingStarted,
      items: [
        { title: t.sidebar.whatIsVibeCoding, href: "/what-is-vibe-coding", icon: Zap },
        { title: t.sidebar.whatIsCode, href: "/what-is-vibe-coding/what-is-code", icon: Code2 },
        { title: t.sidebar.theFullStack, href: "/what-is-vibe-coding/the-full-stack", icon: Layers },
      ],
    },
    {
      title: t.sidebar.yourToolbox,
      items: [
        { title: t.sidebar.aiCodingAgents, href: "/toolbox/ai-agents", icon: Bot },
        { title: t.sidebar.sourceControl, href: "/toolbox/source-control", icon: GitBranch },
        { title: t.sidebar.cloudHosting, href: "/toolbox/cloud-hosting", icon: Cloud },
      ],
    },
    {
      title: t.sidebar.setupGuides,
      items: [
        { title: t.sidebar.createGitHubAccount, href: "/setup/github", icon: Github },
        { title: t.sidebar.createVercelAccount, href: "/setup/vercel", icon: Triangle },
        { title: t.sidebar.installCodingAgent, href: "/setup/coding-agent", icon: Download },
      ],
    },
    {
      title: t.sidebar.putItTogether,
      items: [
        { title: t.sidebar.forkThisApp, href: "/fork-this-app", icon: GitFork },
        { title: t.sidebar.goDeeper, href: "/go-deeper", icon: BookOpen },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-400 sidebar-scrollbar overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Vibe Coding Bootcamp</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {nav.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-600">{t.sidebar.footer}</p>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
