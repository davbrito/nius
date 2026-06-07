import Image from "next/image";
import { ArticleModel } from "@/lib/api/contract";

export interface ArticleProps {
  article: ArticleModel;
}

export default function Article({ article }: ArticleProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <article className="group bg-panel grid min-h-full grid-rows-[220px_1fr] overflow-hidden rounded-[1.5rem] border border-[rgba(23,23,23,0.08)] shadow-[var(--shadow-soft)] backdrop-blur-[10px]">
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
        <p className="text-muted m-0 flex flex-wrap gap-x-4 gap-y-2 text-[0.76rem] font-bold tracking-[0.14em] uppercase">
          <span>{article.source.name}</span>
          <span>{publishedDate}</span>
        </p>

        <header>
          <h3
            className="m-0 text-[2rem] leading-[0.95] font-[family:var(--font-display)]"
            title={article.title}
          >
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </h3>
        </header>

        <p className="text-muted m-0">{article.description}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="hover:border-b-accent w-fit border-b-2 border-b-[rgba(187,77,0,0.35)] pb-1 font-bold no-underline"
        >
          Read full story
        </a>
      </div>
    </article>
  );
}
