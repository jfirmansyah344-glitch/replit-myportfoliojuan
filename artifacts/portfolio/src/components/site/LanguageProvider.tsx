import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "id";
type Bilingual = { en: string; id: string } | string[] | string;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (obj: Bilingual | undefined) => string | string[];
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (obj) => (typeof obj === "string" ? obj : ""),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (obj: Bilingual | undefined): string | string[] => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj;
    return obj[lang] ?? obj.en ?? "";
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
