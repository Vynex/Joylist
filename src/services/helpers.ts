const BASE_URL = "https://api.igdb.com/v4";

export async function getRequest(path: string | URL, params: { [key: string]: string } = {}) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("key", await getApiKey());

  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export async function postRequest(path: string | URL, data?: string) {
  const url = new URL(BASE_URL + path);

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Client-ID": process.env.CLIENT_ID!,
      "Authorization": "Bearer " + await getApiKey(),
    },
  });

  return await response.json();
};

let ACCESS_TOKEN: null | { token: string; expires_at: number } = null;

async function getApiKey() {
  if (!ACCESS_TOKEN || ACCESS_TOKEN.expires_at < Date.now()) {
    const base = "https://id.twitch.tv";
    const url = new URL("/oauth2/token", base);

    url.searchParams.set("client_id", process.env.CLIENT_ID!);
    url.searchParams.set("client_secret", process.env.CLIENT_SECRET!);
    url.searchParams.set("grant_type", "client_credentials");

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.CLIENT_ID!,
      },
    });

    const json = await result.json();

    ACCESS_TOKEN = { token: json.access_token, expires_at: Date.now() + json.expires_in * 1000 };
  }

  return ACCESS_TOKEN.token;
}
