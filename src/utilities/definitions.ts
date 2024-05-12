export type GameCompanyType = {
  id: number;
  company: { id: number; name: string };
  developer?: boolean
  publisher?: boolean
};

export type GameListType = {
  id: number;
  aggregated_rating: number;
  aggregated_rating_count: number;
  cover: { id: 172453, image_id: "co3p2d" };
  first_release_date: number;
  genres: Array<{ id: number; name: string }>;
  involved_companies: Array<GameCompanyType>;
  name: string;
  platforms: Array<{ id: number; abbreviation: string }>;
  rating: number;
  rating_count: number;
  screenshots: Array<{ id: number; image_id: string }>;
  slug: string;
};

export type ReleaseDateType = {
  id: number;
  date: number;
  platform: {
    id: number;
    abbreviation: string;
  };
};

export type GameDetailsType = GameListType & {
  storyline?: string;
  summary: string;

  game_modes: Array<{ id: number; name: string }>;
  release_dates: Array<ReleaseDateType>
};
