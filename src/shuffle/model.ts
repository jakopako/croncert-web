// Richer event type for the shuffle app, mirrors the full ConcertCloud API models.Event schema.
export type GeocodedLocation = {
  osmId?: number;
  type?: string;
  coordinates?: [number, number]; // GeoJSON order: [lon, lat]
};

export type Address = {
  street?: string;
  houseNumber?: string;
  postCode?: string;
  locality?: string;
  state?: string;
  country?: string;
  geolocation?: GeocodedLocation;
};

export type ShuffleEvent = {
  title: string;
  location: string;
  city: string;
  country: string;
  comment?: string;
  url: string;
  sourceUrl: string;
  date: string;
  genres?: string[];
  genresText?: string;
  imageUrl?: string;
  type: string;
  address?: Address;
};

export type ShuffleEventsResponse = {
  data: ShuffleEvent[];
  total: number;
  page: number;
  lastPage: number;
  limit: number;
};
