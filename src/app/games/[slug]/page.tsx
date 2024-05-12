import Image from "next/image";

import { formatDate, getImage, getRatingColor } from "@/utilities";
import Toolbar from "./_components/toolbar";
import { getGameDetails } from "@/services";

import { GameCompanyType, GameDetailsType, ReleaseDateType } from "@/utilities/definitions";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string; };
};

export default async function Page({ params }: Readonly<PageProps>) {
  const gameData: GameDetailsType = await getGameDetails(params.slug);

  const bgImage = getImage(gameData.screenshots[0].image_id, { hd: true });

  return (
    <section className={styles.container}>
      <article className={styles.cover} style={getCoverStyle(bgImage)} />

      <section className={styles.meta}>
        <div>
          <Image className={styles.boxart} alt={gameData.name} src={getImage(gameData.cover.image_id)} height={0} width={0} sizes="100vw" />

          <Toolbar gameId={gameData.id} />

          <ul className={styles.platforms}>
            {getReleases(gameData.release_dates).map((release, i) => (
              <li key={i}>
                <span>{formatDate(release.ts * 1000, "short")}</span>
                <span>{release.platforms.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.about}>
          <div>
            <div className={styles.header}>
              <div className={styles.titles}>
                <h1>{gameData.name}</h1>
                <h2>{getDeveloper(gameData.involved_companies)}</h2>
              </div>

              <div className={styles.rating} style={{ borderColor: getRatingColor(gameData.aggregated_rating), color: getRatingColor(gameData.aggregated_rating) }}>
                {Math.round(gameData.aggregated_rating)}
              </div>
            </div>

            <div className={styles.info}>
              {gameData.storyline || gameData.summary}
            </div>
          </div>

          <div className={styles.tags}>
            <ul className={styles.modes}>
              {gameData.game_modes.map((g) => <li key={g.id}>{g.name}</li>)}
            </ul>

            <ul className={styles.genres}>
              {gameData.genres.map((g) => <li key={g.id}>{g.name}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}

function getCoverStyle(url: string) {
  return {
    backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0), #0A0A0AFF),
      url("${url}")
    `,
  };
}

function getDeveloper(companies: Array<GameCompanyType>) {
  const developer = companies.find((company) => company.developer);
  return developer ? developer.company.name : "N/A";
}

function getReleases(releaseDates: Array<ReleaseDateType>): Array<{ ts: number; platforms: Array<string> }> {
  const platformMap: { [key: string]: Array<string> } = {};
  const includedPlatforms = new Set();

  releaseDates.sort((a, b) => a.date - b.date);

  releaseDates.forEach((releaseDate) => {
    if (includedPlatforms.has(releaseDate.platform.abbreviation)) return;

    if (!platformMap[releaseDate.date]) platformMap[releaseDate.date] = [];
    platformMap[releaseDate.date].push(releaseDate.platform.abbreviation);

    includedPlatforms.add(releaseDate.platform.abbreviation);
  });

  return Object.keys(platformMap).map((date) => ({ ts: +date, platforms: platformMap[date] }));
};
