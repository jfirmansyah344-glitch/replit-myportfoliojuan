import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { SITE, INDUSTRIES, TIMELINE, UI, PRINCIPLES, ABOUT_NARRATIVE, CORE_SKILLS, TOOLS } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

const TOOL_COLOR_MAP: Record<string, string> = {
  "HubSpot": "#FF7A59",
  "Apollo.io": "#1a1a2e",
  "Lusha": "#6C5CE7",
  "LinkedIn Sales Navigator": "#0A66C2",
  "Lemlist": "#FF5733",
  "Mailchimp": "#FFE01B",
  "Trello": "#0052CC",
  "Slack": "#4A154B",
  "Google Workspace": "#4285F4",
  "Canva": "#00C4CC",
  "Microsoft Excel": "#217346",
  "Microsoft PowerPoint": "#D24726",
  "Microsoft Word": "#2B579A",
  "Clockify": "#03A9F4",
  "DocuSign": "#FFCC22",
};

export default function AboutPage() {
  const { t } = useT();
  return (
    <div data-testid="about-page" className="container-x section-y">
      <header className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <div className="eyebrow">{t(UI.sections.aboutHeader.eyebrow) as string}</div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
            {t(UI.sections.aboutHeader.h1) as string}
          </h1>
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-foreground/90 max-w-2xl">
            {(t(ABOUT_NARRATIVE) as string[]).map((para, i) => (<p key={i}>{para}</p>))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2" data-testid="about-industries">
            {INDUSTRIES.map((ind) => (<span key={ind} className="text-xs px-3 py-1.5 rounded-full border border-border">{ind}</span>))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full px-6" data-testid="about-cta-hire">
              <Link to="/contact">{t(UI.cta.hireExec) as string} <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6" data-testid="about-cta-work">
              <Link to="/work">{t(UI.cta.allCases) as string}</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted">
            <img src={SITE.portrait} alt={`Portrait of ${SITE.name}`} className="h-full w-full object-cover" data-testid="about-portrait" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="border-t border-border pt-3">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(UI.sections.aboutHeader.basedIn) as string}</div>
              <div className="mt-1 font-medium">{t(SITE.location) as string}</div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(UI.sections.aboutHeader.openTo) as string}</div>
              <div className="mt-1 flex items-center gap-2" data-testid="about-availability">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-medium text-sm">{t(UI.sections.aboutHeader.openValue) as string}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOW I WORK */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.aboutHowIWork.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">{t(UI.sections.aboutHowIWork.heading) as string}</h2>
          </div>
          <ol className="lg:col-span-8 grid gap-2">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="grid md:grid-cols-12 gap-6 py-7 border-t border-border">
                <div className="md:col-span-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.n}</div>
                <div className="md:col-span-11">
                  <div className="font-display text-xl sm:text-2xl tracking-tight font-medium">{t(p.h) as string}</div>
                  <p className="mt-2 text-muted-foreground">{t(p.b) as string}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CORE SKILLS */}
      <section className="mt-24 border-t border-border pt-16" data-testid="core-skills-section">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.coreSkills.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">{t(UI.sections.coreSkills.heading) as string}</h2>
            <p className="mt-4 text-muted-foreground max-w-md">{t(UI.sections.coreSkills.sub) as string}</p>
          </div>
          <div className="lg:col-span-8 grid gap-8">
            {CORE_SKILLS.map((g, gi) => (
              <div key={gi} className="border-t border-border pt-6">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">{t(g.group) as string}</div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((skill) => (
                    <span key={skill} data-testid={`skill-${skill.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-sm px-3 py-1.5 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS HIGHLIGHT */}
      <section className="mt-24 border-t border-border pt-16" data-testid="tools-section">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.toolsHighlight.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">
              {t(UI.sections.toolsHighlight.heading) as string}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              {t(UI.sections.toolsHighlight.sub) as string}
            </p>
          </div>
          <div className="lg:col-span-8 grid gap-0">
            {TOOLS.map((cat) => (
              <div key={t(cat.category) as string} className="border-t border-border pt-6 pb-6">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  {t(cat.category) as string}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tool) => {
                    const color = TOOL_COLOR_MAP[tool];
                    return (
                      <span
                        key={tool}
                        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-colors cursor-default group"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full group-hover:opacity-60"
                          style={{ backgroundColor: color ?? "#94a3b8" }}
                        />
                        {tool}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONAL TRAJECTORY */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">{t(UI.sections.trajectory.eyebrow) as string}</div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">{t(UI.sections.trajectory.heading) as string}</h2>
          </div>
          <ol className="lg:col-span-8 grid gap-2">
            {TIMELINE.map((tl, i) => (
              <li key={tl.year + i} className="grid md:grid-cols-12 gap-6 py-7 border-t border-border">
                <div className="md:col-span-3 flex md:flex-col gap-3 md:gap-2">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card overflow-hidden">
                    {tl.logo ? (
                      <img src={tl.logo} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
                    ) : (
                      <span className="text-xs font-mono font-semibold tracking-wider text-muted-foreground">{tl.initials || "—"}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{tl.year}</div>
                    {tl.type && (
                      <div className="mt-2 inline-flex items-center text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border border-border text-muted-foreground">
                        {t(tl.type) as string}
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <div className="font-display text-xl tracking-tight font-medium leading-snug">{t(tl.role) as string}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t(tl.org) as string}</div>
                  {tl.star && (
                    <ul className="mt-4 grid gap-2">
                      {(t(tl.star) as string[]).map((line, j) => (
                        <li key={j} className="text-sm text-foreground/80 leading-relaxed flex gap-3">
                          <span className="text-muted-foreground select-none mt-1">·</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DOWNLOAD CV BAR */}
      <div className="mt-12 border border-border rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6" data-testid="about-cv-bar">
        <div className="flex-1">
          <div className="font-display text-xl sm:text-2xl tracking-tight font-medium">{t(UI.cta.downloadResumeAbout) as string}</div>
          <p className="mt-1 text-muted-foreground text-sm">{t(UI.cta.downloadResumeAboutSub) as string}</p>
        </div>
        <a
          href={SITE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="about-download-cv-btn"
          className="inline-flex shrink-0 items-center gap-2.5 px-7 py-3 rounded-full border border-border bg-background hover:bg-foreground hover:text-background hover:border-foreground transition-colors text-base font-medium whitespace-nowrap"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <Download className="h-4 w-4" />
          {t(UI.cta.downloadResume) as string}
        </a>
      </div>
    </div>
  );
}
