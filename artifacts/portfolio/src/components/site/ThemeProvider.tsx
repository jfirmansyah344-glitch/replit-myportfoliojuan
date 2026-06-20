import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "system", setTheme: () => {} });

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "portfolio-theme" }: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try { return (localStorage.getItem(storageKey) as Theme) || defaultTheme; }
    catch { return defaultTheme; }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (t: Theme) => {
    try { localStorage.setItem(storageKey, t); } catch {}
    setThemeState(t);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
