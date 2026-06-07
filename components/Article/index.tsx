"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArticleModel } from "@/lib/api/contract";

export interface ArticleProps {
  article: ArticleModel;
}

export default function Article({ article }: ArticleProps) {
  const t = useTranslations("article");
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="group bg-card shadow-soft grid min-h-full grid-rows-[220px_1fr] overflow-hidden rounded-[1.5rem] border backdrop-blur-[10px]">
      {article.urlToImage ? (
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="relative block overflow-hidden bg-[linear-gradient(135deg,rgba(187,77,0,0.7),rgba(22,68,73,0.8)),#d6c6ae]"
        >
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={article.urlToImage}
            alt=""
            unoptimized
            fill
          />
        </a>
      ) : (
        <div
          className="relative block overflow-hidden bg-[linear-gradient(135deg,rgba(187,77,0,0.7),rgba(22,68,73,0.8)),#d6c6ae]"
          aria-hidden="true"
        />
      )}

      <div className="grid gap-4 p-5">
        <p className="text-muted-foreground m-0 flex flex-wrap gap-x-4 gap-y-2 text-[0.76rem] font-bold tracking-[0.14em] uppercase">
          <span>{article.source.name}</span>
          <span>{publishedDate}</span>
        </p>

        <header>
          <h3
            className="font-display m-0 text-[2rem] leading-[0.95]"
            title={article.title}
          >
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </h3>
        </header>

        <p className="text-muted-foreground m-0">{article.description}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="hover:border-b-accent/80 border-b-accent/35 w-fit border-b-2 pb-1 font-bold no-underline"
        >
          {t("read_full_story")}
        </a>
      </div>
    </article>
  );
}
