import { useT } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useT();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "id" : "en")}
      data-testid="language-switcher"
      className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-border text-xs font-mono uppercase tracking-wider hover:bg-muted transition-colors"
    >
      {lang === "en" ? "ID" : "EN"}
    </button>
  );
}
