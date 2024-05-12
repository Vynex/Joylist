import { postRequest } from "./helpers";

const LIBRARY_FIELDS = "fields name, rating, rating_count, version_parent, aggregated_rating, aggregated_rating_count, slug, cover.image_id, screenshots.image_id, first_release_date, genres.name, platforms.abbreviation, involved_companies.publisher, involved_companies.company.name;";

export async function getHomeGames() {
  try {
    const filter = `
      ${LIBRARY_FIELDS}
      sort aggregated_rating desc;
      where version_parent = null & aggregated_rating != null & aggregated_rating_count >= 10 & rating_count >= 250;
      limit 32;
    `;

    const result = await postRequest("/games", filter);
    return result;
  } catch(error) {
    console.error("Failed getGames:", error);
  }
}

export async function getGameDetails(slug: string) {
  try {
    const filter = `
      fields name, screenshots.image_id, cover.image_id, involved_companies.publisher, involved_companies.developer, involved_companies.company.name, storyline, summary, aggregated_rating, aggregated_rating_count, release_dates.date, release_dates.platform.abbreviation, genres.name, game_modes.name;
      where slug="${slug}";
    `;

    const result = await postRequest("/games", filter);
    return result[0];
  } catch(e) {
    console.error("Failed getSingleGame:", e);
  }
}

export async function getCustomGames(gameIds: Array<number>) {
  try {
    const result = await fetch("/api/custom-games", { method: "POST", body: JSON.stringify({ games: gameIds }) });
    return await result.json();
  } catch(e) {
    console.error("Failed getCustomGames:", e);
  }
}
