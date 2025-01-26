import Image from "next/image";
import styles from "./styles.module.css";
import { ArticleModel } from "@/lib/api/contract";

export interface ArticleProps {
  article: ArticleModel;
}

export default function Article({ article }: ArticleProps) {
  return (
    <article className="max-w-86">
      <header>
        <h3 className={styles.title} title={article.title}>
          <a href={article.url} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </h3>
      </header>
      {article.urlToImage ? (
        <div className="w-full h-32 relative">
          <Image
            className="object-cover"
            src={article.urlToImage}
            alt=""
            unoptimized
            fill
          />
        </div>
      ) : null}
      <p>{article.description}</p>
    </article>
  );
}
