import { PageProps } from "@/.next/types/app/page";
import Headlines from "@/components/Headlines";
import LangSelector from "@/components/LangSelector";
import NewsList from "@/components/NewsList";
import { newsClient } from "@/lib/api/client";
import { getLanguages, resolveLanguage } from "@/lib/language";
import { titleTemplate } from "@/lib/metadata";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: titleTemplate("Home"),
  description: "Nius - Your Favorite News in a single place",
};

export default async function Home({ searchParams }: PageProps) {
  const query = await searchParams;
  const lang = await resolveLanguage(query?.lang);
  const search = query?.search;
  const page = Number(query?.page ?? 1);

  const showHeadlines = page <= 1 && !search;

  return (
    <>
      <div className="flex gap-3">
        <form role="search">
          <input name="search" type="search" placeholder="Search..." />
          <input type="submit" value="Search" />
        </form>
        <LangSelector lang={lang} languages={getLanguages(lang)} />
      </div>

      {showHeadlines ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Headlines lang={lang} />
        </Suspense>
      ) : null}
      <Suspense fallback={<div>Loading...</div>}>
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
    </>
  );
}
