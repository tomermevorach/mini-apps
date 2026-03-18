"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { en, type Translations } from "./en"
import { he } from "./he"

export type Language = "en" | "he"

// Deep merge: he overrides en, with en as fallback for any missing keys
function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base }
  for (const key in override) {
    const overrideVal = override[key]
    const baseVal = base[key]
    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof overrideVal !== "function" &&
      baseVal !== undefined &&
      typeof baseVal === "object"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = deepMerge(baseVal as object, overrideVal as object) as any
    } else if (overrideVal !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = overrideVal as any
    }
  }
  return result
}

const translationMap: Record<Language, Translations> = {
  en,
  he: deepMerge(en, he as Partial<Translations>),
}

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("vbc-lang") as Language | null
    if (stored === "en" || stored === "he") setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr"
    localStorage.setItem("vbc-lang", lang)
  }, [lang])

  const setLang = (l: Language) => setLangState(l)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translationMap[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
