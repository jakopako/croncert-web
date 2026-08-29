import styled, { keyframes } from "styled-components";
import { ShuffleEvent } from "./model";
import { GeolocationState, haversineDistanceKm } from "./geo";
import { buildIcsAndDownload } from "./ics";
import {
  GenreTagBackgroundColor,
  GenreTagTextColor,
  LightTextColor,
  LinkTextHoverColor,
  TextColor,
} from "../components/Constants";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Panel = styled.div`
  max-width: 600px;
  margin: 16px auto 0;
  color: ${LightTextColor};
`;

const Meta = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  opacity: 0.9;
  animation: ${fadeInUp} 500ms ease-out both;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.a<{ $index: number }>`
  background-color: ${GenreTagBackgroundColor};
  color: ${GenreTagTextColor};
  border-radius: 10px;
  padding: 8px 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  animation: ${fadeInUp} 450ms ease-out both;
  animation-delay: ${(props) => 180 + props.$index * 80}ms;

  &:hover {
    background-color: ${LinkTextHoverColor};
    color: ${TextColor};
  }
`;

interface Props {
  event: ShuffleEvent;
  geolocation: GeolocationState;
}

// Renders below the settled split-flap board: distance and the action links.
const ResultDetails = ({ event, geolocation }: Props) => {
  const coords = event.address?.geolocation?.coordinates;
  const hasVenueCoords = !!coords;
  const hasUserCoords =
    geolocation.status === "granted" &&
    geolocation.lat !== undefined &&
    geolocation.lon !== undefined;

  let distanceKm: number | undefined;
  if (hasVenueCoords && hasUserCoords) {
    const [lon, lat] = coords as [number, number];
    distanceKm = haversineDistanceKm(
      { lat: geolocation.lat as number, lon: geolocation.lon as number },
      { lat, lon },
    );
  }

  const directionsUrl = hasVenueCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${coords![1]},${coords![0]}`
    : undefined;

  return (
    <Panel>
      {distanceKm !== undefined && <Meta>{distanceKm.toFixed(1)} km away</Meta>}
      <Actions>
        <ActionButton
          $index={0}
          href={event.url || event.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Get Tickets / Info
        </ActionButton>
        {directionsUrl && (
          <ActionButton
            $index={1}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Directions
          </ActionButton>
        )}
        <ActionButton
          $index={2}
          as="button"
          onClick={() => buildIcsAndDownload(event)}
        >
          Add to Calendar
        </ActionButton>
      </Actions>
    </Panel>
  );
};

export default ResultDetails;
