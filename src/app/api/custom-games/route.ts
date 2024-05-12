import { postRequest } from "@/services/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { games } = await request.json();

  try {
    const filter = `
      fields name, rating, rating_count, version_parent, aggregated_rating, aggregated_rating_count, slug, cover.image_id, screenshots.image_id, first_release_date, genres.name, platforms.abbreviation, involved_companies.publisher, involved_companies.company.name;
      where id = (${games.join(",")});
    `;

    const result = await postRequest("/games", filter);
    return NextResponse.json(result);
  } catch(e) {
    console.error("Failed getCustomGames:", e);
  }
}
