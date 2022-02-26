import Article from "../Article";
import styles from "./styles.module.css";

function Headlines({ articles }) {
  return (
    <section aria-labelledby="headlines-title">
      <header>
        <h2 id="headlines-title" className={styles.title}>
          Headlines
        </h2>
      </header>
      <div className={styles.items}>
        {articles?.map((article) => {
          return <Article {...article} key={article.url} />;
        })}
      </div>
    </section>
  );
}

export default Headlines;
