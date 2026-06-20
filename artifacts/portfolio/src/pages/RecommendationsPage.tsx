import { RECOMMENDATIONS, RECOMMENDATIONS_CATS, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function RecommendationsPage() {
  const { t } = useT();
  return (
    <div data-testid="recommendations-page" className="container-x section-y">
      <header className="max-w-3xl">
        <div className="eyebrow">{t(UI.sections.recsHeader.eyebrow) as string}</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(UI.sections.recsHeader.h1) as string}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{t(UI.sections.recsHeader.sub) as string}</p>
      </header>

      <div className="mt-20 grid gap-20">
        {Object.keys(RECOMMENDATIONS_CATS).map((cat) => (
          <section key={cat} data-testid={`rec-group-${cat}`}>
            <div className="eyebrow mb-8">{t(RECOMMENDATIONS_CATS[cat]) as string}</div>
            <div className="grid md:grid-cols-2 gap-6">
              {RECOMMENDATIONS[cat].map((rec, i) => (
                <figure key={i} data-testid={`rec-${rec.name.replace(/\s/g, "-")}`} className="border border-border rounded-xl p-8 flex flex-col gap-6">
                  <blockquote className="text-base leading-relaxed text-foreground/90 flex-1">
                    <span className="text-3xl leading-none text-muted-foreground font-display mr-1">"</span>
                    {rec.quote}
                  </blockquote>
                  <figcaption>
                    <div className="font-medium text-sm">{rec.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{rec.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
