import Headlines from "@/components/Headlines";
import NewsList from "@/components/NewsList";
import { newsClient } from "@/lib/api/client";
import { titleTemplate } from "@/lib/metadata";
import { Button } from "@base-ui/react/button";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: titleTemplate(t("title")),
    description: t("description"),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("home");

  const query = await searchParams;
  const search = query?.search?.toString();
  const page = Number(query?.page ?? 1);

  const sectionTitle = search
    ? t("results_for", { search })
    : t("latest_coverage");
  const sectionDescription = search
    ? t("search_results_description")
    : t("feed_description");

  return (
    <div className="grid gap-12 pt-4">
      <section className="grid gap-6">
        <Suspense fallback={<div aria-busy="true" />}>
          <Headlines lang={locale} variant="hero" />
        </Suspense>

        <div className="shadow-soft bg-card grid content-start gap-5 rounded-[2rem] border p-6 backdrop-blur-[16px]">
          <form role="search" className="grid gap-3">
            <label
              className="text-muted-foreground text-[0.8rem] font-bold tracking-[0.14em] uppercase"
              htmlFor="news-search"
            >
              {t("search_label")}
            </label>
            <input type="hidden" name="page" value="1" />
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <input
                id="news-search"
                name="search"
                type="search"
                defaultValue={search}
                placeholder={t("search_placeholder")}
                className="bg-card/70 min-h-[3.2rem] w-full rounded-full border px-4"
              />
              <Button
                type="submit"
                className="bg-foreground text-background min-h-[3.2rem] rounded-full border-0 px-5 font-bold"
              >
                {t("search_button")}
              </Button>
            </div>
          </form>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))]">
            <div className="bg-card/60 grid gap-1 rounded-[1.2rem] border p-[0.95rem_1rem]">
              <span className="text-muted-foreground m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                {t("mode")}
              </span>
              <strong className="font-display text-[1.8rem] leading-none">
                {search ? t("search_mode") : t("top_feed")}
              </strong>
            </div>
            <div className="bg-card/60 grid gap-1 rounded-[1.2rem] border p-[0.95rem_1rem]">
              <span className="text-muted-foreground m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                {t("page")}
              </span>
              <strong className="font-display text-[1.8rem] leading-none">
                {page}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section
        id="news-feed"
        aria-labelledby="news-feed-title"
        className="bg-card/85 shadow-soft grid gap-6 rounded-[2rem] border p-7 max-[720px]:rounded-[1.5rem]"
      >
        <div className="flex items-end justify-between gap-4 max-[920px]:flex-col max-[920px]:items-start">
          <div>
            <p className="text-accent-foreground m-0 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
              {t("wire_overview")}
            </p>
            <h2
              id="news-feed-title"
              className="font-display mt-1 text-[clamp(2.5rem,4vw,3.6rem)] leading-[0.94]"
            >
              {sectionTitle}
            </h2>
          </div>
          <p className="text-muted-foreground m-0 max-w-[32rem]">
            {sectionDescription}
          </p>
        </div>

        <Suspense fallback={<div aria-busy="true" />}>
          <NewsList
            page={page}
            pageSize={10}
            promise={newsClient.everything({
              query: {
                language: locale,
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
