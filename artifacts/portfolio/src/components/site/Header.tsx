import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { NAV, SITE, UI } from "@/lib/site";
import { useT } from "./LanguageProvider";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NavLink({ to, end, children, onClick, className }: {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: (opts: { isActive: boolean }) => string;
}) {
  const [location] = useLocation();
  const isActive = end ? location === to : location.startsWith(to);
  return (
    <Link to={to} onClick={onClick} className={className ? className({ isActive }) : ""}>
      {children}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useT();

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="container-x flex items-center justify-between h-16 lg:h-20">
        <Link
          to="/"
          data-testid="header-logo-link"
          className="flex items-center gap-2 font-display text-base lg:text-lg tracking-tight whitespace-nowrap"
        >
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-foreground text-background font-semibold text-sm shrink-0">
            {SITE.initials}
          </span>
          <span className="font-medium">{SITE.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              data-testid={`nav-link-${item.key}`}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium link-underline transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {t(UI.nav[item.key as keyof typeof UI.nav])}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" data-testid="header-hire-cta" className="hidden md:inline-flex rounded-full px-5">
            <Link to="/contact">{t(UI.cta.hire)}</Link>
          </Button>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label="Open menu"
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background" data-testid="mobile-nav">
          <div className="container-x py-4 grid gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${item.key}`}
                className={({ isActive }) =>
                  cn("py-3 text-base font-medium", isActive ? "text-foreground" : "text-muted-foreground")
                }
              >
                {t(UI.nav[item.key as keyof typeof UI.nav])}
              </NavLink>
            ))}
            <Button asChild className="mt-3 w-full rounded-full" data-testid="mobile-hire-cta">
              <Link to="/contact" onClick={() => setOpen(false)}>{t(UI.cta.hire)}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
