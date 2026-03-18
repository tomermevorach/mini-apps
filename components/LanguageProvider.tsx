"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type Lang = "en" | "he"

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "en" || stored === "he") {
      setLangState(stored)
      document.documentElement.lang = stored
      document.documentElement.dir = stored === "he" ? "rtl" : "ltr"
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem("lang", newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === "he" ? "rtl" : "ltr"
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
