import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES, UI, TOOLS } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function WorkPage() {
  const { t } = useT();
  return (
    <div data-testid="work-page" className="container-x section-y">
      <header className="max-w-3xl">
        <div className="eyebrow">{t(UI.sections.workHeader.eyebrow) as string}</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(UI.sections.workHeader.h1) as string}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{t(UI.sections.workHeader.sub) as string}</p>
      </header>

      <ol className="mt-20 grid gap-2">
        {CASE_STUDIES.map((cs, idx) => (
          <li key={cs.id}>
            <Link to={`/work/${cs.id}`} data-testid={`work-case-${cs.id}`}
              className="group grid md:grid-cols-12 gap-6 items-center py-8 border-t border-border hover:bg-muted/30 transition-colors rounded-md px-2">
              <div className="md:col-span-1">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
                {cs.logo ? (
                  <div className="h-9 rounded-md bg-white border border-border shadow-sm flex items-center justify-center px-2 shrink-0 max-w-[5rem]">
                    <img src={cs.logo} alt="" className="h-6 w-auto object-contain max-w-full" />
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      {(cs.industry.en.split(" · ")[1] || cs.industry.en).substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="md:col-span-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(cs.industry) as string}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/60">{cs.year}</div>
              </div>
              <div className="md:col-span-5">
                <h2 className="font-display text-xl sm:text-2xl tracking-tight font-medium">{t(cs.title) as string}</h2>
              </div>
              <div className="md:col-span-2 text-right">
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 group-hover:text-emerald-500 transition-colors">
                  {t(UI.cta.readCase) as string}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {/* TOOLS SECTION */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow">
            {t({ en: "Tech stack & tools", id: "Tech stack & tools" }) as string}
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">
            {t({ en: "The tools I actually use in the field.", id: "Tools yang saya gunakan di lapangan." }) as string}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t({
              en: "Core technologies and platforms I use to build strategic partnerships, develop commercial teams, and create sustainable revenue growth.",
              id: "Teknologi dan platform inti yang saya gunakan untuk membangun kemitraan strategis, mengembangkan tim komersial, dan menciptakan pertumbuhan revenue yang berkelanjutan.",
            }) as string}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((group) => (
            <div key={group.category.en} className="border border-border rounded-xl p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                {t(group.category) as string}
              </div>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((tool) => (
                  <li key={tool} className="flex items-center gap-2.5 text-sm font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
