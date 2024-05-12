import Library from "@/components/library";
import { getHomeGames } from "@/services";
import styles from "./page.module.css";

export default async function Home() {
  const gameList = await getHomeGames();

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Top rated games</h1>
      <Library gameList={gameList} />
    </section>
  );
}
