import Headlines from "@/components/Headlines";
import NewsList from "@/components/NewsList";
import { newsClient } from "@/lib/api/client";
import { resolveLanguage } from "@/lib/language";
import { titleTemplate } from "@/lib/metadata";
import { Button } from "@base-ui/react/button";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: titleTemplate("Home"),
  description: "Nius - Your Favorite News in a single place",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const query = await searchParams;
  const lang = await resolveLanguage(query?.lang?.toString());
  const search = query?.search?.toString();
  const page = Number(query?.page ?? 1);

  const sectionTitle = search ? `Results for \"${search}\"` : "Latest coverage";
  const sectionDescription = search
    ? "Search results from Associated Press and BBC News."
    : "A running brief from trusted publishers, updated in real time.";

  return (
    <div className="grid gap-12 pt-4">
      <section className="grid gap-6">
        <Suspense fallback={<div aria-busy="true" />}>
          <Headlines lang={lang} variant="hero" />
        </Suspense>

        <div className="border-border grid content-start gap-5 rounded-[2rem] border bg-panel p-6 shadow-soft backdrop-blur-[16px]">
          <form role="search" className="grid gap-3">
            <label
              className="text-muted text-[0.8rem] font-bold tracking-[0.14em] uppercase"
              htmlFor="news-search"
            >
              Search the wire
            </label>
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="page" value="1" />
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <input
                id="news-search"
                name="search"
                type="search"
                defaultValue={search}
                placeholder="Economy, climate, elections..."
                className="min-h-[3.2rem] w-full rounded-full border border-ink/12 bg-white/70 px-4"
              />
              <Button
                type="submit"
                className="bg-ink min-h-[3.2rem] rounded-full border-0 px-5 font-bold text-white"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))]">
            <div className="grid gap-1 rounded-[1.2rem] border border-ink/8 bg-white/60 p-[0.95rem_1rem]">
              <span className="text-muted m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                Mode
              </span>
              <strong className="text-[1.8rem] leading-none font-display">
                {search ? "Search" : "Top feed"}
              </strong>
            </div>
            <div className="grid gap-1 rounded-[1.2rem] border border-ink/8 bg-white/60 p-[0.95rem_1rem]">
              <span className="text-muted m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                Page
              </span>
              <strong className="text-[1.8rem] leading-none font-display">
                {page}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="news-feed"
        aria-labelledby="news-feed-title"
        className="border-border grid gap-6 rounded-[2rem] border bg-panel/85 p-7 shadow-soft max-[720px]:rounded-[1.5rem]"
      >
        <div className="flex items-end justify-between gap-4 max-[920px]:flex-col max-[920px]:items-start">
          <div>
            <p className="text-accent-strong m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
              Wire overview
            </p>
            <h2
              id="news-feed-title"
              className="mt-1 text-[clamp(2.5rem,4vw,3.6rem)] leading-[0.94] font-display"
            >
              {sectionTitle}
            </h2>
          </div>
          <p className="text-muted m-0 max-w-[32rem]">{sectionDescription}</p>
        </div>

        <Suspense fallback={<div aria-busy="true" />}>
          <NewsList
            page={page}
            pageSize={10}
            promise={newsClient.everything({
              query: {
                language: lang,
                pageSize: 10,
                page,
                sources: "associated-press,bbc-news",
                q: search,
              },
              fetchOptions: { cache: "no-store" },
            })}
          />
        </Suspense>
      </section>
    </div>
  );
}
