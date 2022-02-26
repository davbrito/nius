import Link from "next/link";
import styles from "./styles.module.css";

function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        <h1>
          <Link href="/">Nius</Link>
        </h1>
        <ul>
          <li>
            <Link href="#">Link</Link>
          </li>
          <li>
            <Link href="#">Link</Link>
          </li>
          <li>
            <Link href="#">Link</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
