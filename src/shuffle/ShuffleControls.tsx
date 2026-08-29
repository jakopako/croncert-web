import { ChangeEvent } from "react";
import styled from "styled-components";
import { GeolocationStatus } from "./geo";
import {
  DarkBorderColor,
  FilterSliderColor,
  FilterThumbColor,
  GenreTagBackgroundColor,
  LightTextColor,
  LinkTextHoverColor,
  SearchBarGlowShadow,
  TextColor,
} from "../components/Constants";

const ControlsBox = styled.div`
  // background-color: ${DarkBorderColor};
  // border-radius: 15px;
  // box-shadow: ${SearchBarGlowShadow};
  color: ${LightTextColor};
  padding: 20px 0 0 0;
  // margin-bottom: 20px;
`;

const Group = styled.div`
  margin-bottom: 16px;
`;

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const RadiusColumn = styled.div`
  background-color: ${DarkBorderColor};
  flex: 4 1 0;
  padding: 15px;
  border-radius: 15px;
  height: 100%;
`;

const ShuffleColumn = styled.div`
  background-color: ${DarkBorderColor};
  flex: 1 1 0;
  display: flex;
  // padding-left: 24px;
  // border-left: 1px solid rgba(255, 255, 255, 0.12);
  // padding: 10px;
  border-radius: 15px;
  height: 70px;
`;

const GroupLabel = styled.div`
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 6px;
`;

const CityInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${GenreTagBackgroundColor};
  padding: 8px 12px;
  font-size: 14px;
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;
`;

const RadiusSlider = styled.input`
  width: 100%;
  cursor: pointer;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: ${FilterSliderColor};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${FilterThumbColor};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 50%;
    background: ${FilterThumbColor};
    cursor: pointer;
  }
`;

const RadiusValue = styled.span`
  font-weight: 700;
  margin-left: 8px;
`;

const ShuffleButton = styled.button`
  flex: 1;
  border-radius: 15px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: ${DarkBorderColor};
  color: ${LightTextColor};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Props {
  radiusKm: number;
  onRadiusChange: (radiusKm: number) => void;
  geoStatus: GeolocationStatus;
  manualCity: string;
  onManualCityChange: (city: string) => void;
  onSpin: () => void;
  spinning: boolean;
}

const ShuffleControls = ({
  radiusKm,
  onRadiusChange,
  geoStatus,
  manualCity,
  onManualCityChange,
  onSpin,
  spinning,
}: Props) => {
  const needsManualCity = geoStatus === "denied" || geoStatus === "unsupported";
  const canSpin =
    !spinning && (!needsManualCity || manualCity.trim().length > 0);

  return (
    <ControlsBox>
      <ControlBar>
        <RadiusColumn>
          <GroupLabel>
            How far are you willing to go?
            <RadiusValue>{radiusKm} km</RadiusValue>
          </GroupLabel>
          <RadiusSlider
            type="range"
            min={1}
            max={50}
            step={1}
            value={radiusKm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onRadiusChange(Number(e.target.value))
            }
          />
        </RadiusColumn>

        <ShuffleColumn>
          <ShuffleButton type="button" onClick={onSpin} disabled={!canSpin}>
            {spinning ? "Shuffling..." : "Shuffle"}
          </ShuffleButton>
        </ShuffleColumn>
      </ControlBar>
      {/* // Todo: no city fallback. If geolocation is unavailable show error message */}
      {needsManualCity && (
        <Group>
          <GroupLabel>
            {geoStatus === "unsupported"
              ? "Geolocation isn't supported by your browser. Enter a city:"
              : "Location access denied. Enter a city instead:"}
          </GroupLabel>
          <CityInput
            type="text"
            placeholder="e.g. Zurich"
            value={manualCity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onManualCityChange(e.target.value)
            }
          />
        </Group>
      )}
    </ControlsBox>
  );
};

export default ShuffleControls;
