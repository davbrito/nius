import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { headers } from "next/headers";

const DEFAULT_LANG = "en";

export function getLanguages(locale: string) {
  const displayNames = new Intl.DisplayNames(locale, { type: "language" });

  const languages = ["es", "en"].map((lang) => ({
    lang,
    displayName:
      displayNames.of(lang)?.replace(/^(.)/, (c) => c.toUpperCase()) ?? lang,
  }));
  return languages;
}

export async function resolveLanguage(
  langQuery: string | undefined,
): Promise<string> {
  if (langQuery) return langQuery;

  const h = await headers();
  const languages = new Negotiator({
    headers: {
      "accept-language": h.get("accept-language") ?? undefined,
    },
  }).languages();
  const locales = ["en", "es"];

  const m = match(languages, locales, DEFAULT_LANG);
  console.log("Matched locale: ", m);
  return m;
}
