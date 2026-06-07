import { newsClient } from "@/lib/api/client";
import { ArticleModel } from "@/lib/api/contract";
import { getTranslations } from "next-intl/server";
import HeroCarousel from "./HeroCarousel";
import Article from "../Article";

interface HeadlinesProps {
  lang: string;
  variant?: "grid" | "hero";
}

async function Headlines({ lang, variant = "grid" }: HeadlinesProps) {
  const t = await getTranslations("headlines");
  const articles = await fetcHeadlines(lang);

  return (
    <section aria-labelledby="headlines-title" className="grid gap-6 py-6">
      {variant === "hero" ? (
        <HeroCarousel articles={articles} />
      ) : (
        <>
          <header className="grid gap-2">
            <p className="text-accent-foreground m-0 text-[0.8rem] font-bold tracking-[0.26em] uppercase">
              {t("front_page_picks")}
            </p>
            <h2
              id="headlines-title"
              className="font-display m-0 text-[clamp(2.6rem,5vw,4rem)] leading-[0.92]"
            >
              {t("headlines")}
            </h2>
            <p className="text-muted-foreground m-0 max-w-[42rem]">
              {t("headlines_description")}
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Article key={article.url} article={article} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Headlines;

const fetcHeadlines = async (lang: string): Promise<ArticleModel[]> => {
  const response = await newsClient.topHeadlines({
    query: { language: lang, pageSize: 3 },
    fetchOptions: { cache: "no-store" },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.body.status === "error") {
    throw new Error("Failed to fetch data");
  }

  return response.body.articles;
};
