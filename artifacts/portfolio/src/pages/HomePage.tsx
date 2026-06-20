import { Link } from "wouter";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, ArrowRight, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, UI, HOME_METRICS, INDUSTRIES, CASE_STUDIES, INSIGHTS } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function HomePage() {
  const { t } = useT();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 32 : 400;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="container-x pt-12 lg:pt-20 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow" data-testid="hero-eyebrow">{t(UI.hero.eyebrow) as string}</div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] font-medium text-balance">
              {UI.hero.headlines.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-muted-foreground">{t(line) as string}</span> : t(line) as string}
                </span>
              ))}
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">{t(UI.hero.paragraph) as string}</p>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7" data-testid="hero-hire-cta">
                <Link to="/contact">{t(UI.cta.hireExec) as string} <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
              <a
                href={SITE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-download-cv"
                className="inline-flex items-center gap-2 px-7 rounded-full border border-border bg-background hover:bg-muted transition-colors text-base font-medium h-12 whitespace-nowrap"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <Download className="h-4 w-4 shrink-0" />
                {t(UI.cta.downloadResumeHero) as string}
              </a>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7" data-testid="hero-explore-cta">
                <Link to="/expertise">{t(UI.cta.explore) as string} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted">
                <img src={SITE.portrait} alt={`Portrait of ${SITE.name}`} loading="eager" className="h-full w-full object-cover" data-testid="hero-portrait" />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden md:flex bg-background border border-border rounded-md px-4 py-3 shadow-sm items-center gap-3" data-testid="hero-availability">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t(UI.hero.badge.now) as string}</div>
                  <div className="text-sm font-medium">{t(UI.hero.badge.copy) as string}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border bg-background py-5">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {[...INDUSTRIES, ...INDUSTRIES].map((ind, idx) => (
            <span key={idx} className="mx-10 font-display text-2xl sm:text-3xl tracking-tight text-muted-foreground">
              {ind} <span className="text-foreground/30 mx-6">•</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* METRICS */}
      <section className="container-x section-y">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.operatingRecord.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-balance">
              {t(UI.sections.operatingRecord.heading) as string}
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" data-testid="home-metrics">
            {HOME_METRICS.map((m) => (
              <div key={m.value + (m.label.en || "")} className="border-t border-foreground/80 pt-5">
                <div className="font-display text-4xl lg:text-5xl tracking-tight font-medium">{m.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{t(m.label) as string}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="section-y border-t border-border">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow">{t(UI.sections.selectedWork.eyebrow) as string}</div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium">
                {t(UI.sections.selectedWork.heading) as string}
              </h2>
            </div>
            <Link to="/work" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium link-underline" data-testid="home-all-work-link">
              {t(UI.cta.allCases) as string} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold tracking-wider" data-testid="work-count">
                0{CASE_STUDIES.length} {(t(UI.sections.selectedWork.casesCount) as string).toUpperCase()}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground hidden sm:inline">
                {t(UI.sections.selectedWork.scrollHint) as string}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous" data-testid="work-scroll-prev"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Next" data-testid="work-scroll-next"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} data-testid="home-cases-scroller"
          className="mt-8 flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pl-6 lg:pl-12 pr-6 lg:pr-12 no-scrollbar"
          style={{ scrollPaddingLeft: "1.5rem" }}>
          {CASE_STUDIES.map((cs, idx) => (
            <Link key={cs.id} to={`/work/${cs.id}`} data-card data-testid={`home-case-${cs.id}`}
              className="group snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[40%] lg:w-[28%] border border-border rounded-lg overflow-hidden bg-card hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                <img src={cs.cover} alt={t(cs.title) as string} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 inline-flex items-center bg-background/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider">
                  CASE {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(cs.industry) as string}</div>
                <h3 className="mt-3 font-display text-xl tracking-tight font-medium leading-snug">{t(cs.title) as string}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium">{t(UI.cta.readCase) as string} <ArrowUpRight className="h-4 w-4" /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="container-x section-y border-t border-border">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.latestLessons.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-balance">
              {t(UI.sections.latestLessons.heading) as string}
            </h2>
            <Button asChild variant="outline" className="mt-6 rounded-full" data-testid="home-insights-cta">
              <Link to="/insights">{t(UI.cta.allInsights) as string}</Link>
            </Button>
          </div>
          <ul className="lg:col-span-8 grid gap-2">
            {INSIGHTS.map((p) => (
              <li key={p.id}>
                <Link to={`/insights/${p.id}`} data-testid={`home-insight-${p.id}`} className="group grid md:grid-cols-12 gap-6 py-6 border-t border-border hover:bg-muted/50 transition-colors rounded-md px-2">
                  <div className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-muted-foreground self-center">{p.date}</div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-xl lg:text-2xl tracking-tight font-medium">{t(p.title) as string}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t(p.category) as string} · {t(p.readTime) as string}</p>
                  </div>
                  <div className="md:col-span-2 self-center text-right">
                    <ArrowUpRight className="ml-auto h-5 w-5 group-hover:rotate-[12deg] transition-transform" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="container-x pb-20 lg:pb-32">
        <div className="border border-border rounded-2xl p-10 lg:p-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-balance">
              {t(UI.sections.ctaBand.heading) as string}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">{t(UI.sections.ctaBand.copy) as string}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <Button asChild size="lg" className="rounded-full" data-testid="cta-band-hire">
              <Link to="/contact">{t(UI.cta.startConversation) as string}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full" data-testid="cta-band-store">
              <Link to="/expertise">{t(UI.cta.browseStore) as string}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
