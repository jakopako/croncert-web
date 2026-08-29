import { ShuffleEventsResponse } from "./model";

export type FetchShuffleEventsParams = {
  baseUrl: string;
  radiusKm: number;
  lat?: number;
  lon?: number;
  city?: string;
  limit?: number;
  signal?: AbortSignal;
};

// Fetches a pool of upcoming concerts within a radius (or city), omitting the
// `date` param so all future events come back for client-side time-window filtering.
export const fetchShuffleEvents = async ({
  baseUrl,
  radiusKm,
  lat,
  lon,
  city,
  limit = 100,
  signal,
}: FetchShuffleEventsParams): Promise<ShuffleEventsResponse> => {
  const params = new URLSearchParams();
  params.set("type", "concert");
  params.set("limit", String(limit));
  params.set("radius", String(radiusKm));
  if (lat !== undefined && lon !== undefined) {
    params.set("lat", String(lat));
    params.set("lon", String(lon));
  } else if (city) {
    params.set("city", city);
  }

  const res = await fetch(`${baseUrl}/api/events?${params.toString()}`, {
    signal,
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch events (status ${res.status})`);
  }
  return res.json();
};
