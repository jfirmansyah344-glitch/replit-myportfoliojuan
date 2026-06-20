import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSIGHTS, ALL_SKILL_TAGS, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";
import { cn } from "@/lib/utils";

export default function InsightsPage() {
  const { t } = useT();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? INSIGHTS.filter((p) => p.skills.includes(filter)) : INSIGHTS;
  const featured = INSIGHTS[0];

  return (
    <div data-testid="insights-page" className="container-x section-y">
      <header className="max-w-3xl">
        <div className="eyebrow">{t(UI.sections.insightsHeader.eyebrow) as string}</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(UI.sections.insightsHeader.h1) as string}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{t(UI.sections.insightsHeader.sub) as string}</p>
      </header>

      {/* FEATURED */}
      <section className="mt-16">
        <div className="eyebrow mb-6">{t(UI.sections.insightsHeader.featured) as string}</div>
        <Link to={`/insights/${featured.id}`} data-testid={`featured-insight-${featured.id}`}
          className="group grid md:grid-cols-12 gap-8 border border-border rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="md:col-span-5 aspect-[4/3] overflow-hidden bg-muted">
            <img src={featured.cover} alt={t(featured.title) as string} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <div className="eyebrow">{t(featured.category) as string}</div>
              {featured.youtubeId && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border">
                  <Play className="h-3 w-3" /> {t(UI.sections.insightsHeader.videoIncluded) as string}
                </span>
              )}
            </div>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl tracking-tight font-medium leading-snug">{t(featured.title) as string}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t(featured.excerpt) as string}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{featured.date}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{t(featured.readTime) as string}</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium">
              {t(UI.cta.readEssay) as string} <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* FILTER */}
      <section className="mt-16 border-t border-border pt-10">
        <div className="eyebrow mb-4">{t(UI.sections.insightsHeader.filterEyebrow) as string}</div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            data-testid="filter-all"
            className={cn("text-xs px-3 py-1.5 rounded-full border transition-colors", !filter ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted")}
          >
            {t(UI.sections.insightsHeader.filterAll) as string}
          </button>
          {ALL_SKILL_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag === filter ? null : tag)}
              data-testid={`filter-${tag.toLowerCase().replace(/\s/g, "-")}`}
              className={cn("text-xs px-3 py-1.5 rounded-full border transition-colors", filter === tag ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted")}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <ul className="mt-8 grid gap-2">
        {filtered.map((p) => (
          <li key={p.id}>
            <Link to={`/insights/${p.id}`} data-testid={`insight-${p.id}`}
              className="group grid md:grid-cols-12 gap-6 py-7 border-t border-border hover:bg-muted/40 transition-colors rounded-md px-2 items-start">
              <div className="md:col-span-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.date}</div>
              <div className="md:col-span-8">
                <h3 className="font-display text-xl lg:text-2xl tracking-tight font-medium">{t(p.title) as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(p.excerpt) as string}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{t(p.category) as string}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{t(p.readTime) as string}</span>
                  {p.youtubeId && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Play className="h-3 w-3" /> Video
                    </span>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 self-center text-right">
                <ArrowUpRight className="ml-auto h-5 w-5 group-hover:rotate-[12deg] transition-transform" />
              </div>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-muted-foreground" data-testid="insights-empty">
            No insights match this filter.
          </li>
        )}
      </ul>
    </div>
  );
}
