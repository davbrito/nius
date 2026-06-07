"use client";
import Image from "next/image";
import { Button } from "@base-ui/react/button";
import PreviewDialog from "./PreviewDialog";
import { ArticleModel, ResponseShapes } from "@/lib/api/contract";
import { useSetSearchParam } from "@/lib/query";
import { useTranslations } from "next-intl";
import { use } from "react";

interface NewsListProps {
  page: number;
  pageSize: number;
  promise: Promise<ResponseShapes["everything"]>;
}

export default function NewsList({ page, pageSize, promise }: NewsListProps) {
  const t = useTranslations("news_list");
  const query = useSetSearchParam();

  const data = use(promise);
  const { status, body } = data;

  if (status === 400)
    return (
      <div className="text-muted-foreground rounded-[1.25rem] border border-dashed p-6 text-center">
        {body.message}
      </div>
    );

  if (status !== 200) {
    console.error("Failed to fetch data", data);
    throw new Error("Failed to fetch data");
  }

  const articles = (body.articles ?? []) as ArticleModel[];
  const pageCount = Math.max(1, Math.ceil((body.totalResults ?? 0) / pageSize));

  if (articles.length === 0) {
    return (
      <div className="text-muted-foreground rounded-[1.25rem] border border-dashed p-6 text-center">
        {t("no_results")}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-2">
        {articles.map((article) => (
          <li key={article.url} className="min-w-0">
            <article className="bg-card grid min-h-full gap-4 rounded-[1.4rem] border p-5">
              {article.urlToImage ? (
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    width={720}
                    height={405}
                    className="h-64 w-full object-cover"
                    unoptimized
                    rel="noreferrer"
                  />
                </div>
              ) : null}
              <p className="text-muted-foreground m-0 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold tracking-[0.14em] uppercase">
                <span>{article.source.name}</span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
              <h3 className="font-display m-0 text-[clamp(1.6rem,3vw,2.25rem)] leading-[0.96]">
                <a href={article.url} target="_blank" rel="noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="text-muted-foreground m-0">{article.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <PreviewDialog article={article} />
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b-accent hover:border-b-accent w-fit border-b-2 pb-1 font-bold no-underline transition"
                >
                  {t("open_article")}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <nav
        className="flex flex-wrap items-center justify-center gap-3"
        aria-label={t("pagination")}
      >
        {page > 1 ? (
          <Button
            className="bg-foreground text-background min-h-12 rounded-full border-0 px-4 font-bold"
            type="button"
            onClick={() => {
              query.push("page", String(page - 1));
            }}
          >
            {t("previous")}
          </Button>
        ) : null}
        <span className="text-muted-foreground min-w-24 text-center font-bold">
          {page} of {pageCount}
        </span>
        {page < pageCount ? (
          <Button
            className="bg-foreground text-background min-h-12 rounded-full border-0 px-4 font-bold"
            type="button"
            onClick={() => {
              query.push("page", String(page + 1));
            }}
          >
            {t("next")}
          </Button>
        ) : null}
      </nav>
    </div>
  );
}
