import Head from "next/head";
import Header from "../Header";
import HiddenLinks from "../HiddenLinks";
import styles from "./styles.module.css";

function PageLayout({ children, title }) {
  return (
    <div className={styles.container}>
      <HiddenLinks />
      <Head>
        <title>{`Nius${title ? ` - ${title}` : ""}`}</title>
        <meta
          name="description"
          content="Nius - Your Favorite News in a single place"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main id="main-content">{children}</main>
      <footer>
        <p>
          <small>
            Made with{" "}
            <g-emoji fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png">
              ❤️
            </g-emoji>{" "}
            by <a href="https://github.com/davbrito">davbrito</a>
          </small>
        </p>
        <p>
          <small>
            You can view the source on{" "}
            <a href="https://github.com/davbrito/nius">GitHub</a>
          </small>
        </p>
      </footer>
    </div>
  );
}

export default PageLayout;
