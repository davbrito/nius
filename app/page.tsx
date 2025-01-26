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
  const page = Number(query?.page ?? 1);

  return (
    <>
      <p>
        Select the language for the news{" "}
        <LangSelector languages={getLanguages(lang)} />
      </p>

      {page <= 1 && (
        <Suspense fallback={<div>Loading...</div>}>
          <Headlines lang={lang} />
        </Suspense>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <NewsList
          page={page}
          promise={newsClient.everything({
            query: {
              language: lang,
              pageSize: 10,
              page,
              sources: "associated-press,bbc-news",
            },
            fetchOptions: { cache: "no-store" },
          })}
        />
      </Suspense>
    </>
  );
}
