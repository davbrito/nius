import Link from "next/link";
import styles from "./styles.module.css";

export default function HiddenLinks() {
  return (
    <div className={styles.root}>
      <Link href="#main-content">Skip to content</Link>
    </div>
  );
}
