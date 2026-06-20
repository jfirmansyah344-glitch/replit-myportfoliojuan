import { Link } from "wouter";
import { Linkedin, Instagram, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { SiThreads } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { NAV, SITE, SERVICES, PRODUCTS, UI } from "@/lib/site";
import { useT } from "./LanguageProvider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
  threads: SiThreads,
};

export default function Footer() {
  const { t } = useT();
  return (
    <footer data-testid="site-footer" className="border-t border-border bg-background">
      <div className="container-x py-16 lg:py-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        <div className="md:col-span-1">
          <div className="font-display text-2xl lg:text-3xl tracking-tight font-medium">{SITE.name}</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t(UI.footer.ownerSub)}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">{t(SITE.location)}</p>

          <div className="mt-8">
            <div className="eyebrow mb-3">{t(UI.footer.followMe)}</div>
            <div className="flex items-center gap-2">
              {SITE.social.map((s) => {
                const Icon = iconMap[s.icon] || Mail;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-testid={`footer-social-${s.icon}`}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full px-6" data-testid="footer-hire-juan-btn">
              <Link to="/contact">{t(UI.cta.hire)} <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6" data-testid="footer-access-insights-btn">
              <Link to="/insights">{t(UI.cta.accessInsights)} <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-5">{t(UI.footer.expertise)}</div>
          <ul className="grid gap-3">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={`/expertise#${s.id}`} className="text-base font-medium link-underline" data-testid={`footer-service-${s.id}`}>
                  {t(s.name)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="eyebrow mt-8 mb-5">{t(UI.footer.digitalStore)}</div>
          <ul className="grid gap-3">
            {PRODUCTS.slice(0, 5).map((p) => (
              <li key={p.id}>
                <Link to={`/expertise#${p.id}`} className="text-sm text-muted-foreground hover:text-foreground link-underline" data-testid={`footer-product-${p.id}`}>
                  {t(p.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-5">{t(UI.footer.quickLinks)}</div>
          <ul className="grid gap-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-base font-medium link-underline" data-testid={`footer-nav-${n.key}`}>
                  {t(UI.nav[n.key as keyof typeof UI.nav])}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {SITE.name}. {t(UI.footer.rights)}</p>
          <p className="text-xs text-muted-foreground">{t(UI.footer.tagline)}</p>
        </div>
      </div>
    </footer>
  );
}
