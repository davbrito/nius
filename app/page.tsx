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

  const showHeadlines = page <= 1 && !search;
  const sectionTitle = search ? `Results for \"${search}\"` : "Latest coverage";
  const sectionDescription = search
    ? "Search results from Associated Press and BBC News."
    : "A running brief from trusted publishers, updated in real time.";

  return (
    <div className="grid gap-12 pt-4">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.95fr)]">
        <div className="shadow-soft rounded-4xl border border-(--color-border) bg-[radial-gradient(circle_at_top_right,rgba(194,79,46,0.18),transparent_32%),linear-gradient(135deg,rgba(255,250,242,0.96),rgba(247,237,223,0.98))] p-[clamp(1.75rem,4vw,3rem)]">
          <p className="m-0 text-[0.8rem] font-bold tracking-[0.2em] text-[color:var(--color-accent-strong)] uppercase">
            Global news, stripped to signal
          </p>
          <h1 className="m-0 max-w-[11ch] text-[clamp(3.2rem,6vw,5.8rem)] leading-[0.9] font-(--font-display)">
            A sharper front page for the stories worth your attention.
          </h1>
          <p className="text-muted mt-4 max-w-[56ch] text-[1.08rem]">
            Nius tracks top headlines and deeper reporting in one focused
            reading surface, with language switching and quick search built in.
          </p>
        </div>

        <div className="border-border grid content-start gap-5 rounded-[2rem] border bg-[rgba(255,252,246,0.82)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-[16px]">
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
                className="min-h-[3.2rem] w-full rounded-full border border-[rgba(23,23,23,0.12)] bg-[rgba(255,255,255,0.72)] px-4"
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
            <div className="grid gap-1 rounded-[1.2rem] border border-[rgba(23,23,23,0.08)] bg-[rgba(255,255,255,0.62)] p-[0.95rem_1rem]">
              <span className="text-muted m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                Mode
              </span>
              <strong className="text-[1.8rem] leading-none font-[family:var(--font-display)]">
                {search ? "Search" : "Top feed"}
              </strong>
            </div>
            <div className="grid gap-1 rounded-[1.2rem] border border-[rgba(23,23,23,0.08)] bg-[rgba(255,255,255,0.62)] p-[0.95rem_1rem]">
              <span className="text-muted m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                Page
              </span>
              <strong className="text-[1.8rem] leading-none font-[family:var(--font-display)]">
                {page}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {showHeadlines ? (
        <Suspense fallback={<div aria-busy="true" />}>
          <Headlines lang={lang} />
        </Suspense>
      ) : null}

      <section
        id="news-feed"
        aria-labelledby="news-feed-title"
        className="border-border grid gap-6 rounded-[2rem] border bg-[rgba(255,251,244,0.68)] p-7 shadow-[var(--shadow-soft)] max-[720px]:rounded-[1.5rem]"
      >
        <div className="flex items-end justify-between gap-4 max-[920px]:flex-col max-[920px]:items-start">
          <div>
            <p className="m-0 text-[0.8rem] font-bold tracking-[0.2em] text-[color:var(--color-accent-strong)] uppercase">
              Wire overview
            </p>
            <h2
              id="news-feed-title"
              className="mt-1 text-[clamp(2.5rem,4vw,3.6rem)] leading-[0.94] font-[family:var(--font-display)]"
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
