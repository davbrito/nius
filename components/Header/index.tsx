"use client";

import LangSelector from "@/components/LangSelector";
import { getLanguages } from "@/lib/language";
import Link from "next/link";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { useTranslations } from "next-intl";

export default function Header({ lang }: { lang: string }) {
  const t = useTranslations("header");

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-transparent bg-transparent py-4 transition-all duration-300">
      <div className="site-header-content mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 max-[720px]:w-[min(100%-1rem,1180px)]">
        <div className="grid gap-[0.1rem]">
          <p className="text-muted-foreground m-0 text-[0.75rem] tracking-[0.28em] uppercase">
            {t("daily_brief")}
          </p>
          <h1 className="font-display m-0 text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.88]">
            <Link href="/">Nius</Link>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NavigationMenu.Root>
            <NavigationMenu.List className="m-0 flex list-none flex-wrap items-center gap-3 p-0">
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                >
                  {t("front_page")}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  href="#headlines-title"
                  className="text-muted-foreground hover:text-foreground hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                >
                  {t("headlines")}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  href="#news-feed"
                  className="text-muted-foreground hover:text-foreground hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                >
                  {t("news_feed")}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
          <LangSelector lang={lang} languages={getLanguages(lang)} />
        </div>
      </div>
    </header>
  );
}
