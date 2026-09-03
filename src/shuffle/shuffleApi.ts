import { ShuffleEventsResponse } from "./model";
import { addHours } from "date-fns";

export type FetchShuffleEventsParams = {
  baseUrl: string;
  radiusKm: number;
  lat?: number;
  lon?: number;
  city?: string;
  limit?: number;
  signal?: AbortSignal;
};

// Fetches a pool of concerts within the next 24 hours and a radius (or city).
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
  const fromTime = new Date();
  params.set("type", "concert");
  params.set("limit", String(limit));
  params.set("radius", String(radiusKm));
  params.set("fromTime", fromTime.toISOString());
  params.set("toTime", addHours(fromTime, 24).toISOString());
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
