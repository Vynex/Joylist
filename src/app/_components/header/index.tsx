import Link from "next/link";
import Search from "@/components/search";
import styles from "./index.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logo}>🕹️ Joylist</Link>

      <Search />

      <Link href={"/my-list"}>My List</Link>
    </header>
  );
}
