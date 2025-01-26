import { newsClient } from "@/lib/api/client";
import Article from "../Article";
import styles from "./styles.module.css";

async function Headlines({ lang }: { lang: string }) {
  const articles = await fetcHeadlines(lang);
  return (
    <section aria-labelledby="headlines-title">
      <header>
        <h2 id="headlines-title" className={styles.title}>
          Headlines
        </h2>
      </header>
      <div className={styles.items}>
        {articles?.map((article) => {
          return <Article key={article.url} article={article} />;
        })}
      </div>
    </section>
  );
}

export default Headlines;

const fetcHeadlines = async (lang: string) => {
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
