"use client";

import { useEffect, useState } from "react";
import Library from "@/components/library";
import { getCustomGames } from "@/services";

import styles from "./page.module.css";

export default function MyList() {
  const [ gameList, setGameList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const allGames = new Set<number>();
    const playedGames = localStorage.getItem("played") || "[]";
    const wishedGames = localStorage.getItem("wished") || "[]";

    try {
      const played = JSON.parse(playedGames);
      const wished = JSON.parse(wishedGames);

      if (!played.length && !wished.length) {
        setIsLoading(false);
        return;
      }

      played.forEach((game: number) => allGames.add(game));
      wished.forEach((game: number) => allGames.add(game));

      setIsLoading(true);

      (async () => {
        const result = await getCustomGames(Array.from(allGames));
        setGameList(result);
        setIsLoading(false);
      })();
    } catch(error) {
      console.error("Failed parsing games:", error);
    }
  }, []);

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>My List</h1>

      {isLoading ? <span className={styles.loader} /> : (
        !!gameList.length
          ? <Library gameList={gameList} />
          : <span className={styles.empty}>No games found</span>
        )
      }
    </section>
  );
}
