import Link from "next/link"
import { ArrowRight } from "lucide-react"

const apps = [
  {
    title: "Vibe Coding Bootcamp",
    description: "Learn how to build and ship web apps using AI coding agents. No coding experience needed.",
    href: "/vibe-coding-bootcamp",
    emoji: "⚡",
    tags: ["Learning", "AI"],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Mini Apps</h1>
          <p className="text-lg text-slate-500">A collection of small, focused web apps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {apps.map((app) => (
            <Link
              key={app.href}
              href={app.href}
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4">{app.emoji}</div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                {app.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{app.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-sm text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
