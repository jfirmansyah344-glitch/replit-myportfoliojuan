import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";

export default function NotFoundPage() {
  const { t } = useT();
  return (
    <div className="container-x section-y text-center" data-testid="not-found-page">
      <div className="eyebrow">{t(UI.sections.notFound.eyebrow) as string}</div>
      <h1 className="mt-6 font-display text-5xl sm:text-6xl tracking-tighter font-medium">
        {t(UI.sections.notFound.heading) as string}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
        {t(UI.sections.notFound.copy) as string}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="rounded-full px-8" data-testid="not-found-home">
          <Link to="/">{t(UI.cta.backHome) as string}</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-8">
          <Link to="/contact">{t(UI.cta.hire) as string}</Link>
        </Button>
      </div>
    </div>
  );
}
