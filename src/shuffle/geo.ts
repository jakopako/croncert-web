import { useEffect, useState } from "react";

export type GeolocationStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported";

export type GeolocationState = {
  status: GeolocationStatus;
  lat?: number;
  lon?: number;
};

export const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({ status: "idle" });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "unsupported" });
      return;
    }
    setState({ status: "requesting" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: "granted",
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setState({ status: "denied" });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  return state;
};

const EARTH_RADIUS_KM = 6371;

// Great-circle distance between two lat/lon points, in kilometers.
export const haversineDistanceKm = (
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLon * sinDLon;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export type TravelMode = "walking" | "transit" | "driving";

// Average speed heuristics (km/h); the API has no routing engine so this is an estimate only.
const AVERAGE_SPEED_KMH: Record<TravelMode, number> = {
  walking: 5,
  transit: 25,
  driving: 40,
};

export const estimateTravelTimeMinutes = (
  distanceKm: number,
  mode: TravelMode,
): number => Math.max(1, Math.round((distanceKm / AVERAGE_SPEED_KMH[mode]) * 60));
