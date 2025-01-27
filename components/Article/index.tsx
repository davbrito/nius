import Image from "next/image";
import styles from "./styles.module.css";
import { ArticleModel } from "@/lib/api/contract";

export interface ArticleProps {
  article: ArticleModel;
}

export default function Article({ article }: ArticleProps) {
  return (
    <article className="max-w-xs">
      <header>
        <h3 className={styles.title} title={article.title}>
          <a href={article.url} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </h3>
      </header>
      {article.urlToImage ? (
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="relative mx-[-1rem] mt-[-1rem] block h-36 overflow-hidden bg-black/20"
        >
          <Image
            className="object-contain transition-transform hover:scale-105"
            src={article.urlToImage}
            alt=""
            unoptimized
            fill
          />
        </a>
      ) : null}
      <p className="pt-3">{article.description}</p>
    </article>
  );
}
