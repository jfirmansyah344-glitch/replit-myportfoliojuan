import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useT();
  const idx = CASE_STUDIES.findIndex((c) => c.id === id);
  const cs = CASE_STUDIES[idx];

  if (!cs) {
    return (
      <div className="container-x section-y text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl font-medium">Case study not found</h1>
        <Button asChild className="mt-8 rounded-full" variant="outline">
          <Link to="/work">{t(UI.cta.backToWork) as string}</Link>
        </Button>
      </div>
    );
  }

  const prev = CASE_STUDIES[idx - 1];
  const next = CASE_STUDIES[idx + 1];

  return (
    <article data-testid="work-detail-page" className="container-x section-y">
      <div className="mb-10">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline" data-testid="work-detail-back">
          <ArrowLeft className="h-4 w-4" /> {t(UI.cta.backToWork) as string}
        </Link>
      </div>

      <header className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            {cs.logo && (
              <div className="h-10 w-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center p-1.5 shrink-0">
                <img src={cs.logo} alt="" className="h-full w-full object-contain" />
              </div>
            )}
            <div className="eyebrow">{t(cs.industry) as string} · {cs.year}</div>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tighter leading-[0.95] font-medium text-balance">{t(cs.title) as string}</h1>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
            <img src={cs.cover} alt={t(cs.title) as string} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3 order-last lg:order-first">
          <div className="sticky top-28 grid gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(UI.case.role) as string}</div>
              <div className="mt-2 text-sm font-medium">{t(cs.snapshot.role) as string}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(UI.case.scope) as string}</div>
              <div className="mt-2 text-sm font-medium">{t(cs.snapshot.scope) as string}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(UI.case.kpis) as string}</div>
              <ul className="mt-2 grid gap-1">
                {(t(cs.snapshot.kpis) as string[]).map((k) => (
                  <li key={k} className="text-sm">· {k}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 grid gap-14">
          <section>
            <div className="eyebrow mb-4">{t(UI.case.problem) as string}</div>
            <p className="text-lg leading-relaxed">{t(cs.problem) as string}</p>
          </section>

          <section className="border-t border-border pt-10">
            <div className="eyebrow mb-4">{t(UI.case.approach) as string}</div>
            <p className="text-lg leading-relaxed">{t(cs.approach) as string}</p>
          </section>

          <section className="border-t border-border pt-10">
            <div className="eyebrow mb-4">{t(UI.case.execution) as string}</div>
            <ul className="grid gap-4">
              {(t(cs.execution) as string[]).map((item, i) => (
                <li key={i} className="flex gap-3 text-base leading-relaxed">
                  <span className="text-muted-foreground select-none mt-1 shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <div className="eyebrow mb-6">{t(UI.case.impact) as string}</div>
            <p className="text-xs text-muted-foreground mb-6">{t(UI.case.impactNote) as string}</p>
            <div className="grid sm:grid-cols-3 gap-6" data-testid="case-results">
              {cs.results.map((r) => (
                <div key={r.metric} className="border-t border-foreground/80 pt-5">
                  <div className="font-display text-4xl tracking-tight font-medium">{r.metric}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{t(r.label) as string}</div>
                </div>
              ))}
            </div>
          </section>

          {cs.evidence && cs.evidence.length > 0 && (
            <section className="border-t border-border pt-10">
              <div className="eyebrow mb-6">{t(UI.case.evidence) as string}</div>
              <div className="grid gap-6 sm:grid-cols-2">
                {cs.evidence.map((ev, i) => (
                  <figure key={i} className="rounded-lg overflow-hidden border border-border">
                    <img src={ev.src} alt={t(ev.caption) as string} className="w-full object-cover" />
                    <figcaption className="px-4 py-3 text-xs text-muted-foreground">{t(ev.caption) as string}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="border-t border-border pt-10">
            <div className="eyebrow mb-4">{t(UI.case.takeaway) as string}</div>
            <p className="text-lg leading-relaxed font-medium">{t(cs.takeaway) as string}</p>
          </section>
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-10 grid sm:grid-cols-2 gap-6">
        {prev ? (
          <Link to={`/work/${prev.id}`} data-testid="work-prev" className="group flex flex-col gap-2 p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Previous</div>
            <div className="font-display text-base font-medium">{t(prev.title) as string}</div>
          </Link>
        ) : <div />}
        {next && (
          <Link to={`/work/${next.id}`} data-testid="work-next" className="group flex flex-col gap-2 p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors text-right ml-auto w-full">
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">{t(UI.cta.nextCase) as string} <ArrowRight className="h-4 w-4" /></div>
            <div className="font-display text-base font-medium">{t(next.title) as string}</div>
          </Link>
        )}
      </div>
    </article>
  );
}
