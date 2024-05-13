import Image from "next/image";
import Link from "next/link";
import { formatDate, getCommaSeparatedValues, getImage, getRatingColor } from "@/utilities";

import { GameCompanyType, GameListType } from "@/utilities/definitions";
import styles from "./index.module.css";

export default function GameBox({ data }: { data: GameListType }) {
  return (
    <Link href={"/games/" + data.slug} className={styles.boxcover} legacyBehavior>
    <article className={styles.cover}>
      <Image alt={data.name} src={getImage(data.cover.image_id)} height={0} width={0} sizes="100vw" />

      <div className={styles.screenshots}>
        {data.screenshots.slice(0, 4).map((screenshot) => (
          <Image key={screenshot.id} alt={""} src={getImage(screenshot.image_id)} height={0} width={0} sizes="100vw" />
        ))}
      </div>
      <div className={styles.details}>
        <div className={styles.about}>
          <Link href={"/games/" + data.slug} className={styles.title}>
            <span className={styles.label}>{data.name}</span>
          </Link>
        </div>

        <div className={styles.table}>
          <div className={styles.header}>
            <span className={styles.meta}>{formatDate(data.first_release_date * 1000)}</span>
            <span className={styles.rating} style={{ borderColor: getRatingColor(data.aggregated_rating), color: getRatingColor(data.aggregated_rating) }}>
              {Math.round(data.aggregated_rating)}
            </span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>Genres</span>
            <span className={styles.value}>{getCommaSeparatedValues(data.genres, "name")}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>Platforms</span>
            <span className={styles.value}>{getCommaSeparatedValues(data.platforms, "abbreviation")}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>Publishers</span>
            <span className={styles.value}>{getCommaSeparatedValues(getPublishers(data.involved_companies), "name")}</span>
          </div>
        </div>
      </div>
    </article>
    </Link>
  )
}

function getPublishers(companies: Array<GameCompanyType>) {
  return companies.filter((company) => company.publisher).map(({ company }) => company);
}
