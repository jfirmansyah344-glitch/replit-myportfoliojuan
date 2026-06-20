import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SERVICES, PRODUCTS, GALLERY, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function ExpertisePage() {
  const { t } = useT();
  return (
    <div data-testid="expertise-page" className="container-x section-y">
      <header className="max-w-3xl">
        <div className="eyebrow">{t(UI.sections.expertiseHeader.eyebrow) as string}</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(UI.sections.expertiseHeader.h1) as string}
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{t(UI.sections.expertiseHeader.sub) as string}</p>
      </header>

      {/* SERVICES */}
      <section className="mt-20 border-t border-border pt-16">
        <h2 className="eyebrow mb-10">{t(UI.sections.expertiseHeader.servicesHeader) as string}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div key={s.id} id={s.id} data-testid={`service-${s.id}`} className="border border-border rounded-xl p-8 flex flex-col gap-6">
              <div>
                <h3 className="font-display text-2xl tracking-tight font-medium">{t(s.name) as string}</h3>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(s.engagement) as string}</div>
                <p className="mt-4 text-base text-foreground/80 leading-relaxed">{t(s.summary) as string}</p>
              </div>
              <ul className="grid gap-2 mt-auto">
                {(t(s.deliverables) as string[]).map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full self-start mt-2" data-testid={`service-cta-${s.id}`}>
                <Link to="/contact">{t(UI.cta.enquire) as string} <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* DIGITAL STORE */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">{t(UI.sections.expertiseHeader.productsEyebrow) as string}</div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">{t(UI.sections.expertiseHeader.productsHeading) as string}</h2>
          <p className="mt-4 text-muted-foreground">{t(UI.sections.expertiseHeader.productsSub) as string}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.id} id={p.id} data-testid={`product-${p.id}`} className="border border-border rounded-xl p-7 flex flex-col gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t(p.type) as string}</div>
                <h3 className="mt-2 font-display text-xl tracking-tight font-medium">{t(p.name) as string}</h3>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed flex-1">{t(p.summary) as string}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="font-display text-2xl tracking-tight font-medium">{p.price}</div>
                <Button size="sm" className="rounded-full" data-testid={`product-cta-${p.id}`}>
                  {t(p.cta) as string}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="mt-24 border-t border-border pt-16">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow">{t(UI.sections.gallery.eyebrow) as string}</div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl tracking-tight font-medium">{t(UI.sections.gallery.heading) as string}</h2>
          <p className="mt-4 text-muted-foreground">{t(UI.sections.gallery.sub) as string}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
              <img src={g.src} alt={t(g.caption) as string} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-medium">{t(g.caption) as string}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
