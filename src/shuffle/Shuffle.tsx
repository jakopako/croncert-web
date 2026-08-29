import { useState } from "react";
import styled from "styled-components";
import ShuffleControls from "./ShuffleControls";
import SplitFlapBoard from "./SplitFlapBoard";
import ResultDetails from "./ResultDetails";
import { fetchShuffleEvents } from "./shuffleApi";
import { useGeolocation } from "./geo";
import { getNext24HoursWindow, isDateWithinWindow } from "./dateFilters";
import { ShuffleEvent } from "./model";
import { SPIN_DURATION_MS } from "./flapCharset";
import { LightTextColor } from "../components/Constants";

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  color: ${LightTextColor};
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.85;
  margin-top: 0;
  margin-bottom: 20px;
`;

const StatusMessage = styled.p`
  font-size: 14px;
  opacity: 0.85;
`;

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0 50px;
`;

interface Props {
  baseUrlFromEnv: string;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const filterPool = (pool: ShuffleEvent[]): ShuffleEvent[] => {
  const window = getNext24HoursWindow();
  return pool.filter((event) => isDateWithinWindow(event.date, window));
};

const Shuffle = ({ baseUrlFromEnv }: Props) => {
  const geolocation = useGeolocation();
  const [radiusKm, setRadiusKm] = useState(15);
  const [manualCity, setManualCity] = useState("");
  const [resultEvent, setResultEvent] = useState<ShuffleEvent | null>(null);
  const [boardMessage, setBoardMessage] = useState<string[] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPoolForRadius = async (
    radiusKm: number,
  ): Promise<ShuffleEvent[]> => {
    const hasCoords = geolocation.status === "granted";
    const res = await fetchShuffleEvents({
      baseUrl: baseUrlFromEnv,
      radiusKm,
      lat: hasCoords ? geolocation.lat : undefined,
      lon: hasCoords ? geolocation.lon : undefined,
      city: hasCoords ? undefined : manualCity.trim() || undefined,
    });
    return res.data;
  };

  const performSpin = async () => {
    const previousEvent = resultEvent;
    setSpinning(true);
    setError(null);
    setBoardMessage(null);

    try {
      const data = await fetchPoolForRadius(radiusKm);
      const filtered = filterPool(data);

      if (filtered.length === 0) {
        setResultEvent(null);
        setBoardMessage(["NO SHOWS FOUND", "TRY OTHER SETTINGS"]);
        await delay(SPIN_DURATION_MS); // let the board roll to the message
        return;
      }

      let idx = Math.floor(Math.random() * filtered.length);
      if (filtered.length > 1 && filtered[idx] === previousEvent) {
        idx = (idx + 1) % filtered.length;
      }
      const target = filtered[idx];
      setResultEvent(target); // triggers the board to roll towards the new target

      await delay(SPIN_DURATION_MS); // let the spin animation play
    } catch (e) {
      setError("Something went wrong fetching concerts. Please try again.");
    } finally {
      setSpinning(false);
    }
  };

  const geoWaiting =
    geolocation.status === "idle" || geolocation.status === "requesting";

  return (
    <Page>
      <Title>Concert Shuffle (BETA)</Title>
      <Subtitle>Shuffle through nearby gigs and find your next show.</Subtitle>

      <ShuffleControls
        radiusKm={radiusKm}
        onRadiusChange={setRadiusKm}
        geoStatus={geolocation.status}
        manualCity={manualCity}
        onManualCityChange={setManualCity}
        onSpin={performSpin}
        spinning={spinning || geoWaiting}
      />

      {geoWaiting && (
        <StatusMessage>Waiting for location access...</StatusMessage>
      )}
      {error && <StatusMessage>{error}</StatusMessage>}

      <SpinnerBox>
        <SplitFlapBoard
          target={resultEvent}
          message={boardMessage}
          spinning={spinning}
        />
      </SpinnerBox>

      {!spinning && resultEvent && (
        <ResultDetails event={resultEvent} geolocation={geolocation} />
      )}
    </Page>
  );
};

export default Shuffle;
