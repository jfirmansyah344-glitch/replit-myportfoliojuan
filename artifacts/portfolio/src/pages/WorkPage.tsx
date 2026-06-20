import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, UI } from "@/lib/site";
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
              <div className="md:col-span-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(cs.industry) as string}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/60">{cs.year}</div>
              </div>
              <div className="md:col-span-5">
                <h2 className="font-display text-xl sm:text-2xl tracking-tight font-medium">{t(cs.title) as string}</h2>
              </div>
              <div className="md:col-span-2 text-right">
                <ArrowUpRight className="ml-auto h-5 w-5 group-hover:rotate-[12deg] transition-transform" />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
