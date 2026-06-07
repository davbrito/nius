import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  let locale = routing.defaultLocale;

  // Try reading from NEXT_LOCALE cookie (set by LangSelector)
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const cookieLocale = store.get("NEXT_LOCALE")?.value;
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Fall back to Accept-Language header negotiation
    const { negotiateLanguage } = await import("@/lib/language");
    const negotiated = await negotiateLanguage();
    locale = hasLocale(routing.locales, negotiated) ? negotiated : locale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
