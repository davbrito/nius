import Emoji from "../Emoji";
import styles from "./styles.module.css";

function PageFooter() {
  return (
    <footer className={styles.footer + " container"}>
      <p>
        <small>
          Made with <Emoji id="heart" /> by{" "}
          <a href="https://github.com/davbrito">davbrito</a>
        </small>
      </p>
      <p>
        <small>
          You can view the source on{" "}
          <a href="https://github.com/davbrito/nius">GitHub</a>
        </small>
      </p>
    </footer>
  );
}

export default PageFooter;
