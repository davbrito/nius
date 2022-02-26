import styles from "./styles.module.css";

export default function Article(article) {
  return (
    <article className={styles.root}>
      <header>
        <h3 className={styles.title} title={article.title}>
          <a href={article.url} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </h3>
      </header>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.image} src={article.urlToImage} alt="" />
      <p>{article.description}</p>
    </article>
  );
}
