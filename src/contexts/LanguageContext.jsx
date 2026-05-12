import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageByCode,
} from "../i18n/languageConfig";
import { TRANSLATIONS } from "../i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "kwes:lang";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  });

  // Apply <html lang> + dir attributes whenever language changes.
  useEffect(() => {
    const meta = getLanguageByCode(language);
    document.documentElement.lang = language;
    document.documentElement.dir = meta?.rtl ? "rtl" : "ltr";
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((code) => {
    setLanguageState(code);
  }, []);

  const t = useCallback(
    (key) => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
      return dict[key] ?? TRANSLATIONS[DEFAULT_LANGUAGE][key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, languages: LANGUAGES }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
};
