// =============================================================================
//  KWES — Global Language Configuration  (Zero-Layout-Shift edition)
// -----------------------------------------------------------------------------
//  GLOBAL MAIN ONLY:
//    English, Swahili, French, Spanish, Arabic, Chinese, Portuguese, German.
//
//  All regional dialects have been removed. For any other language the user
//  needs, the hidden Google Translate widget remains available via the
//  "More languages…" entry in the LanguageSwitcher dropdown.
// =============================================================================

export const LANGUAGES = [
  { code: "en",    name: "English",    native: "English",   flag: "🇬🇧" },
  { code: "sw",    name: "Swahili",    native: "Kiswahili", flag: "🇰🇪" },
  { code: "fr",    name: "French",     native: "Français",  flag: "🇫🇷" },
  { code: "es",    name: "Spanish",    native: "Español",   flag: "🇪🇸" },
  { code: "ar",    name: "Arabic",     native: "العربية",    flag: "🇸🇦", rtl: true },
  { code: "zh-CN", name: "Chinese",    native: "中文",       flag: "🇨🇳" },
  { code: "pt",    name: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "de",    name: "German",     native: "Deutsch",   flag: "🇩🇪" },
];

export const DEFAULT_LANGUAGE = "en";

export const getLanguageByCode = (code) =>
  LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
