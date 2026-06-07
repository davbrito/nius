import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cache } from "react";

const DEFAULT_LANG = "en";
const supportedLocales = ["en", "es"];

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

  return await negotiateLanguage();
}

export const negotiateLanguage = cache(async (): Promise<string> => {
  const { headers } = await import("next/headers");
  const h = await headers();
  const languages = new Negotiator({
    headers: {
      "accept-language": h.get("accept-language") ?? undefined,
    },
  }).languages();

  return match(languages, supportedLocales, DEFAULT_LANG);
});
