import { useState } from "react";
import { Crosshair, TrendingUp, Settings2 } from "lucide-react";
import { RECOMMENDATIONS, RECOMMENDATIONS_CATS, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Strategic Visionary": <Crosshair className="h-3.5 w-3.5" />,
  "Growth Architect": <TrendingUp className="h-3.5 w-3.5" />,
  "Operational Master": <Settings2 className="h-3.5 w-3.5" />,
};

export default function RecommendationsPage() {
  const { t } = useT();
  const cats = Object.keys(RECOMMENDATIONS_CATS);
  const [activeTab, setActiveTab] = useState(cats[0]);

  return (
    <div data-testid="recommendations-page" className="container-x section-y">
      <header className="max-w-3xl">
        <div className="eyebrow">{t(UI.sections.recsHeader.eyebrow) as string}</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(UI.sections.recsHeader.h1) as string}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          {t(UI.sections.recsHeader.sub) as string}
        </p>
      </header>

      {/* Category tabs */}
      <div className="mt-14 flex flex-wrap gap-3">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            data-testid={`rec-tab-${cat}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeTab === cat
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-background text-foreground/70 border-border hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            {CAT_ICONS[cat]}
            {t(RECOMMENDATIONS_CATS[cat]) as string}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {RECOMMENDATIONS[activeTab].map((rec, i) => (
          <figure
            key={i}
            data-testid={`rec-${rec.name.replace(/\s/g, "-")}`}
            className="border border-border rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-background"
          >
            {/* Opening quote */}
            <div className="text-5xl font-display text-emerald-500/60 leading-none select-none">"</div>

            {/* Quote body */}
            <blockquote className="text-base leading-relaxed text-foreground/85 flex-1">
              {rec.quote}
            </blockquote>

            {/* Author */}
            <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
              {rec.logo ? (
                <div
                  className={`flex items-center justify-center bg-white rounded-lg border border-border shrink-0 p-1.5 ${
                    rec.logoWide ? "h-9 w-20" : "h-9 w-9"
                  }`}
                >
                  <img
                    src={rec.logo}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-9 w-9 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                    {rec.name.substring(0, 2)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-semibold text-sm">{rec.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{rec.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
