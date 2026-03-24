"use client"

// ─── helpers ──────────────────────────────────────────────────────────────────
const cn = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ")

const fmtPct = (renewed: number, candidates: number) =>
  candidates === 0 ? "—" : `${((renewed / candidates) * 100).toFixed(1)}%`

// ─── mock data ────────────────────────────────────────────────────────────────
const agent = {
  name: "דניאל כהן",
  id: "54321",
  team: "דרום",
  supervisor: "מנהלת: מיכל לוי",
  campaign: "חופשה בגדול",
  campaignId: "312",
  periodStart: "01/02/2025",
  periodEnd: "31/05/2025",
  daysLeft: 47,
}

// מלאי — פוליסות שנה קודמת לאותה תקופה
const inv = { car: 35, home: 32, biz: 13, total: 80 }

// פוליסות חדשות
const newPol = { car: 16, home: 12, biz: 4, total: 32 }

// חידושים
const renewalRows = [
  {
    label: "חידושים עד תחילת ביטוח פברואר",
    car:  { renewed: 30, candidates: 35 },
    home: { renewed: 28, candidates: 32 },
    biz:  { renewed: 10, candidates: 13 },
  },
  {
    label: "חידושים תחילת ביטוח מרץ",
    car:  { renewed: 0, candidates: 8 },
    home: { renewed: 0, candidates: 7 },
    biz:  { renewed: 0, candidates: 3 },
    isUpcoming: true,
  },
  {
    label: 'סה"כ חידושים עד מרץ',
    car:  { renewed: 30, candidates: 43 },
    home: { renewed: 28, candidates: 39 },
    biz:  { renewed: 10, candidates: 16 },
    isTotal: true,
  },
]

const totalRenewals = 30 + 28 + 10 // חידושים שבוצעו בפועל (חודש נוכחי)
const totalProduction = newPol.total + totalRenewals // 32 + 68 = 100
const currentGrowth = totalProduction - inv.total // 100 - 80 = +20

// מדרגות גידול
const tiers = [
  { level: 1, growth: 10, car: 4,  home: 4,  biz: 2, prize: "כרטיסים לבודפשט עם ה.ע. €850" },
  { level: 2, growth: 20, car: 9,  home: 8,  biz: 3, prize: "חצי כרטיס לקוסטה ריקה עם ה.ע. €250 או כרטיסים לבודפשט" },
  { level: 3, growth: 30, car: 14, home: 12, biz: 4, prize: "כרטיס לקוסטה ריקה עם ה.ע. €250 + כרטיסים לבודפשט" },
  { level: 4, growth: 40, car: 19, home: 16, biz: 5, prize: "כרטיס לקוסטה ריקה + 2 כרטיסי בודפשט" },
  { level: 5, growth: 50, car: 24, home: 20, biz: 6, prize: "2 כרטיסי קוסטה ריקה + 2 כרטיסי בודפשט" },
]

const currentTierLevel = tiers.filter((t) => currentGrowth >= t.growth).length // = 2
const nextTier = tiers[currentTierLevel]
const gapToNext = nextTier ? nextTier.growth - currentGrowth : 0

const MAX_GROWTH = 55 // scale for progress bar
const progressPct = Math.min((currentGrowth / MAX_GROWTH) * 100, 100)

// ─── page ─────────────────────────────────────────────────────────────────────
export default function MivtzaGidolPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#e8edf5] text-[#1e2a3a]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-l from-[#0f2444] to-[#1a4080]">
        {/* top bar */}
        <div className="border-b border-white/10 px-6 py-2.5 flex items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-6">
            <span className="font-bold text-white text-base">{agent.name}</span>
            <span>מס׳ מוכר: {agent.id}</span>
            <span>צוות: {agent.team}</span>
            <span>{agent.supervisor}</span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <span>תחילת מבצע: {agent.periodStart}</span>
            <span>סיום מבצע: {agent.periodEnd}</span>
          </div>
        </div>

        {/* campaign + countdown */}
        <div className="px-6 py-5 flex items-center justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] bg-blue-500/30 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
                מבצע פרסים — מדידת גידול
              </span>
            </div>
            <h1 className="text-2xl font-bold">
              {agent.campaign} | {agent.campaignId}
            </h1>
            <p className="text-sm text-white/55 mt-1.5">
              פוליסות שנמדדות: חדשות + חידושים &nbsp;·&nbsp; מלאי שנה קודמת: {inv.total} פוליסות
            </p>
          </div>

          {/* countdown box */}
          <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-4 text-center shrink-0">
            <div className="text-4xl font-bold leading-none">{agent.daysLeft}</div>
            <div className="text-xs text-white/55 mt-1.5">ימים לסיום המבצע</div>
          </div>
        </div>
      </header>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto p-6 space-y-5">

        {/* ── Summary metrics ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            title="מלאי שנה קודמת"
            value={inv.total}
            sub="פוליסות בתקופת המבצע"
            color="blue"
          />
          <MetricCard
            title="פוליסות חדשות"
            value={newPol.total}
            sub="שהסוכן הפיק"
            color="indigo"
          />
          <MetricCard
            title="חידושים"
            value={totalRenewals}
            sub="שהסוכן חידש עד כה"
            color="violet"
          />
          <MetricCard
            title="גידול נוכחי"
            value={`+${currentGrowth}`}
            sub={nextTier ? `עוד ${gapToNext} למדרגה ${nextTier.level}` : "הגעת למדרגה המקסימלית!"}
            color="green"
            prominent
          />
        </div>

        {/* ── Tiers section ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-lg">
              יעדים ופרסים — גידול לפי מספר פוליסות
            </h2>
            <div className="text-sm text-slate-500">
              ביצוע נוכחי:{" "}
              <span className="font-bold text-blue-600">{totalProduction}</span> פוליסות{" "}
              (גידול:{" "}
              <span className="font-bold text-green-600">+{currentGrowth}</span>)
            </div>
          </div>

          {/* progress bar */}
          <div className="px-6 pt-5 pb-3">
            <div className="relative h-3 bg-slate-100 rounded-full overflow-visible">
              {/* fill */}
              <div
                className="h-full bg-gradient-to-l from-blue-700 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
              {/* tier markers */}
              {tiers.map((t) => {
                const markerPct = (t.growth / MAX_GROWTH) * 100
                const achieved = currentGrowth >= t.growth
                return (
                  <div
                    key={t.level}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white transition-colors",
                      achieved ? "bg-blue-600" : "bg-slate-300"
                    )}
                    style={{ right: `${markerPct}%`, transform: "translate(50%, -50%)" }}
                  />
                )
              })}
            </div>
            {/* tier labels */}
            <div className="relative mt-3" style={{ height: "18px" }}>
              {tiers.map((t) => {
                const markerPct = (t.growth / MAX_GROWTH) * 100
                return (
                  <span
                    key={t.level}
                    className={cn(
                      "absolute text-xs font-medium -translate-x-1/2",
                      currentGrowth >= t.growth ? "text-blue-600" : "text-slate-400"
                    )}
                    style={{ right: `calc(${markerPct}% - 10px)` }}
                  >
                    +{t.growth}
                  </span>
                )
              })}
            </div>
          </div>

          {/* tier columns — in RTL grid, tier 1 renders on the right, tier 5 on the left */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-5 gap-3">
              {tiers.map((tier) => {
                const achieved = currentGrowth >= tier.growth
                const isCurrent = tier.level === currentTierLevel

                return (
                  <div
                    key={tier.level}
                    className={cn(
                      "relative rounded-xl border-2 p-4 text-center transition-all",
                      isCurrent
                        ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                        : achieved
                        ? "border-blue-300 bg-blue-50/50"
                        : "border-slate-200 bg-slate-50/50"
                    )}
                  >
                    {/* "המדרגה שלך" badge */}
                    {isCurrent && (
                      <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-blue-600 text-white text-[10px] px-2.5 py-0.5 rounded-full whitespace-nowrap z-10">
                        המדרגה שלך ✓
                      </div>
                    )}

                    {/* checkmark / circle */}
                    <div className="mb-2">
                      {achieved ? (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mx-auto">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 mx-auto" />
                      )}
                    </div>

                    {/* growth number */}
                    <div className={cn("text-3xl font-bold leading-none mb-0.5", achieved ? "text-blue-700" : "text-slate-400")}>
                      +{tier.growth}
                    </div>
                    <div className="text-[11px] text-slate-400 mb-3">גידול נדרש</div>

                    {/* prize */}
                    <div className={cn("text-xs leading-relaxed mb-4 min-h-[48px]", achieved ? "text-slate-700" : "text-slate-400")}>
                      {tier.prize}
                    </div>

                    {/* per-track breakdown */}
                    <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-1 text-[11px]">
                      <div className={cn("rounded py-1", achieved ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400")}>
                        🚗 {tier.car}
                      </div>
                      <div className={cn("rounded py-1", achieved ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-400")}>
                        🏠 {tier.home}
                      </div>
                      <div className={cn("rounded py-1", achieved ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}>
                        💼 {tier.biz}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom row: new policies + renewals ──────────────────────────── */}
        <div className="grid grid-cols-3 gap-5">

          {/* new policies */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">פוליסות חדשות</h3>
            </div>
            <div className="p-5 space-y-3">
              {([
                { label: "רכב",  value: newPol.car,  icon: "🚗", cls: "bg-blue-50 text-blue-700" },
                { label: "דירה", value: newPol.home, icon: "🏠", cls: "bg-purple-50 text-purple-700" },
                { label: "עסק",  value: newPol.biz,  icon: "💼", cls: "bg-emerald-50 text-emerald-700" },
              ] as const).map((t) => (
                <div key={t.label} className={cn("flex items-center justify-between rounded-xl px-4 py-3", t.cls)}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                  <span className="text-xl font-bold">{t.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-slate-100 text-slate-700 mt-1">
                <span className="text-sm font-semibold">סה״כ</span>
                <span className="text-xl font-bold">{newPol.total}</span>
              </div>
            </div>
          </div>

          {/* renewals table */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800">חידושי פוליסות</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  מידע על חידושים ניתן כתנאי סף בנוסף למדידת הגידול
                </p>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full shrink-0">
                חידשו עד כה: <strong>{totalRenewals}</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 w-44" />
                    <th className="text-center px-3 py-3 text-xs font-semibold text-blue-600" colSpan={2}>🚗 רכב</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-purple-600" colSpan={2}>🏠 דירה</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-emerald-600" colSpan={2}>💼 עסק</th>
                  </tr>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-400">
                    <th className="text-right px-4 py-2 font-medium">תקופה</th>
                    <th className="text-center px-2 py-2 font-medium">מאומדות</th>
                    <th className="text-center px-2 py-2 font-medium">% חידוש</th>
                    <th className="text-center px-2 py-2 font-medium">מאומדות</th>
                    <th className="text-center px-2 py-2 font-medium">% חידוש</th>
                    <th className="text-center px-2 py-2 font-medium">מאומדות</th>
                    <th className="text-center px-2 py-2 font-medium">% חידוש</th>
                  </tr>
                </thead>
                <tbody>
                  {renewalRows.map((row, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-slate-100 transition-colors",
                        row.isTotal    ? "bg-blue-50/60 font-semibold"
                        : row.isUpcoming ? "bg-amber-50/40"
                        : "hover:bg-slate-50"
                      )}
                    >
                      <td className="px-4 py-3 text-xs text-slate-600 leading-tight">
                        {row.label}
                        {row.isUpcoming && (
                          <span className="block text-[10px] text-amber-500 mt-0.5">טרם חודש</span>
                        )}
                      </td>

                      {(["car", "home", "biz"] as const).map((track) => {
                        const d = row[track]
                        const r = d.renewed / (d.candidates || 1)
                        const pctColor =
                          d.renewed === 0 && !row.isTotal ? "text-slate-300"
                          : r >= 0.7 ? "text-emerald-600"
                          : "text-amber-500"
                        return (
                          <>
                            <td key={`${track}-c`} className="text-center px-2 py-3 text-slate-700">
                              {d.renewed}
                            </td>
                            <td key={`${track}-p`} className={cn("text-center px-2 py-3 text-xs font-semibold", pctColor)}>
                              {fmtPct(d.renewed, d.candidates)}
                            </td>
                          </>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-slate-100">
              <p className="text-[11px] text-slate-400">
                * המערכת מביאה את כמות החידושים לכל תקופת המבצע או מצטבר עד לחודש העוקב.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({
  title, value, sub, color, prominent,
}: {
  title: string
  value: string | number
  sub: string
  color: "blue" | "indigo" | "violet" | "green"
  prominent?: boolean
}) {
  const palette = {
    blue:   { wrap: "bg-blue-50   border-blue-200",   val: "text-blue-700"   },
    indigo: { wrap: "bg-indigo-50 border-indigo-200", val: "text-indigo-700" },
    violet: { wrap: "bg-violet-50 border-violet-200", val: "text-violet-700" },
    green:  { wrap: "bg-green-50  border-green-200",  val: "text-green-700"  },
  }
  const { wrap, val } = palette[color]

  return (
    <div className={cn("rounded-2xl border-2 p-5", wrap, prominent && "shadow-lg")}>
      <div className="text-xs text-slate-500 mb-2 font-medium">{title}</div>
      <div className={cn("text-4xl font-bold tracking-tight", val)}>{value}</div>
      <div className="text-xs text-slate-400 mt-1.5">{sub}</div>
    </div>
  )
}
