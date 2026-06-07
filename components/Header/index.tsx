"use client";

import LangSelector from "@/components/LangSelector";
import { getLanguages } from "@/lib/language";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Header({ lang: defaultLang }: { lang: string }) {
  const searchParams = useSearchParams();
  const lang = searchParams?.get("lang") ?? defaultLang;

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-transparent bg-transparent py-4 transition-all duration-300">
      <div className="site-header-content mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 max-[720px]:w-[min(100%-1rem,1180px)]">
        <div className="grid gap-[0.1rem]">
          <p className="text-muted m-0 text-[0.75rem] tracking-[0.28em] uppercase">
            Daily editorial brief
          </p>
          <h1 className="m-0 text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.88] font-[family:var(--font-display)]">
            <Link href="/">Nius</Link>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LangSelector lang={lang} languages={getLanguages(lang)} />
          <nav>
            <ul className="m-0 flex list-none flex-wrap items-center gap-3 p-0">
              <li>
                <Link
                  className="text-muted hover:text-ink hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                  href="/"
                >
                  Front page
                </Link>
              </li>
              <li>
                <a
                  className="text-muted hover:text-ink hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                  href="#headlines-title"
                >
                  Headlines
                </a>
              </li>
              <li>
                <a
                  className="text-muted hover:text-ink hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                  href="#news-feed"
                >
                  News feed
                </a>
              </li>
              <li>
                <a
                  className="text-muted hover:text-ink hover:border-accent inline-flex min-h-10 items-center border-b-2 border-transparent py-1 no-underline"
                  href="https://github.com/davbrito/nius"
                  rel="noreferrer"
                  target="_blank"
                >
                  Source
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
