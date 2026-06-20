import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import { SiThreads } from "react-icons/si";
import { SITE, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";
import ContactForm from "@/components/site/ContactForm";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
  threads: SiThreads,
};

export default function ContactPage() {
  const { t } = useT();
  return (
    <div data-testid="contact-page" className="container-x section-y">
      <header className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-7">
          <div className="eyebrow">{t(UI.sections.contactHeader.eyebrow) as string}</div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter leading-[0.95] font-medium text-balance">
            {t(UI.sections.contactHeader.h1) as string}
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">{t(UI.sections.contactHeader.sub) as string}</p>
        </div>
        <div className="lg:col-span-5 grid gap-8">
          <div>
            <div className="eyebrow mb-4">{t(UI.sections.contactHeader.direct) as string}</div>
            <div className="grid gap-2">
              {SITE.social.map((s) => {
                const Icon = iconMap[s.icon] || Mail;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    data-testid={`contact-social-${s.icon}`}
                    className="inline-flex items-center gap-3 text-sm font-medium hover:text-muted-foreground transition-colors link-underline w-fit">
                    <Icon className="h-4 w-4 shrink-0" />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">{t(UI.sections.contactHeader.bestFit) as string}</div>
            <ul className="grid gap-2">
              {(t(UI.sections.contactHeader.bestFitList) as string[]).map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-foreground select-none">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="border-t border-border pt-12" data-testid="contact-form-section">
        <ContactForm />
      </div>
    </div>
  );
}
