import GameBox from "../gamebox";
import { GameListType } from "@/utilities/definitions";
import styles from "./index.module.css";

export default function Library({ gameList }: { gameList: Array<GameListType> }) {
  if (!gameList) return null;

  return (
    <section className={styles.container}>
      {gameList.map(game => (
        <GameBox key={game.id} data={game} />
      ))}
    </section>
  )
}
