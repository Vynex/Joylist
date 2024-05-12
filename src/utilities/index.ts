type dateStyleType = "full" | "long" | "medium" | "short" | undefined;
export const formatDate = (timestamp = Date.now(), dateStyle: dateStyleType = "long") => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "short" }).format(date);
};

export const getImage = (id: string, { hd = false, original = false } = {}) => {
  let size = "720p";
  if (hd) size = "1080p";
  if (original) size = "original";

  return `https://images.igdb.com/igdb/image/upload/t_${size}/${id}.jpg`;
};

export const getRatingColor = (rating: number) => {
  let score = Math.round(rating);

  let color = "#FF6666";
  if (score > 40) color = "#F7D060";
  if (score > 65) color = "#609966";
  if (score > 90) color = "#379237";

  return color;
};

export const getCommaSeparatedValues = <T, K extends keyof T>(array: Array<T>, key: K) => {
  return array.map((el) => el[key]).join(", ");
}
