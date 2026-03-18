"use client"

import { useLanguage } from "@/lib/i18n/LanguageContext"

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      className="text-xs px-2.5 py-1 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors font-medium"
    >
      {t.lang.switchTo}
    </button>
  )
}
