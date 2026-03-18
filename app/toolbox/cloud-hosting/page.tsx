"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { VendorCards, type Vendor } from "@/components/interactive/VendorCards"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const vendorMeta: Pick<Vendor, "requiresCLI" | "free" | "url" | "recommended">[] = [
  { requiresCLI: false, free: true, url: "https://vercel.com", recommended: true },
  { requiresCLI: false, free: true, url: "https://pages.cloudflare.com" },
  { requiresCLI: false, free: true, url: "https://netlify.com" },
]

export default function CloudHosting() {
  const { t } = useLanguage()
  const p = t.cloudHosting

  const vendors: Vendor[] = p.vendors.map((v, i) => ({ ...v, ...vendorMeta[i] }))

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
          {p.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{p.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{p.subtitle}</p>
      </div>

      <div className="prose max-w-none">
        <h2>{p.whatIsTitle}</h2>
        <p>{p.whatIsP1}</p>
        <p>{p.whatIsP2}</p>
        <h2>{p.deployTitle}</h2>
        <p>{p.deployOld}</p>
        <p>{p.deployNew}</p>
        <ol>
          {p.deploySteps.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p>{p.deployClose}</p>
        <h2>{p.urlTitle}</h2>
        <p>{p.urlP}</p>
        <h2>{p.compareTitle}</h2>
        <p>{p.compareP}</p>
      </div>

      <div className="my-8">
        <VendorCards vendors={vendors} />
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link href="/toolbox/source-control">
            <ArrowLeft className="w-4 h-4" /> {t.common.back}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/setup/github">
            {p.nextBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
