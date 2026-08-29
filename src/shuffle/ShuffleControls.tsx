import { ChangeEvent } from "react";
import styled from "styled-components";
import { TIME_HORIZON_PRESETS, TimeHorizonKey } from "./presets";
import { GeolocationStatus } from "./geo";
import {
  DarkBorderColor,
  FilterSliderColor,
  FilterThumbColor,
  GenreTagBackgroundColor,
  GenreTagTextColor,
  LightTextColor,
  SearchBarBackgroundColor,
  SearchBarGlowShadow,
  TextColor,
} from "../components/Constants";

const ControlsBox = styled.div`
  background-color: ${DarkBorderColor};
  border-radius: 15px;
  box-shadow: ${SearchBarGlowShadow};
  color: ${LightTextColor};
  padding: 20px;
  margin-bottom: 20px;
`;

const Group = styled.div`
  margin-bottom: 16px;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 16px;

  > * {
    flex: 1 1 260px;
    margin-bottom: 0;
  }
`;

const GroupLabel = styled.div`
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 6px;
`;

const PresetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PresetButton = styled.button<{ $selected: boolean }>`
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: ${(props) => (props.$selected ? 700 : 400)};
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.$selected ? SearchBarBackgroundColor : GenreTagTextColor};
  background-color: ${(props) =>
    props.$selected ? SearchBarBackgroundColor : "transparent"};
  color: ${(props) => (props.$selected ? TextColor : LightTextColor)};
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
  max-width: 320px;
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

const SpinButton = styled.button`
  border-radius: 15px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: ${GenreTagBackgroundColor};
  color: ${GenreTagTextColor};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Props {
  radiusKm: number;
  onRadiusChange: (radiusKm: number) => void;
  timeHorizon: TimeHorizonKey;
  onTimeHorizonChange: (key: TimeHorizonKey) => void;
  geoStatus: GeolocationStatus;
  manualCity: string;
  onManualCityChange: (city: string) => void;
  onSpin: () => void;
  spinning: boolean;
}

const ShuffleControls = ({
  radiusKm,
  onRadiusChange,
  timeHorizon,
  onTimeHorizonChange,
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
      <FilterRow>
        <Group>
          <GroupLabel>
            How far are you willing to go?
            <RadiusValue>{radiusKm} km</RadiusValue>
          </GroupLabel>
          <RadiusSlider
            type="range"
            min={0}
            max={50}
            step={1}
            value={radiusKm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onRadiusChange(Number(e.target.value))
            }
          />
        </Group>

        <Group>
          <GroupLabel>When?</GroupLabel>
          <PresetRow>
            {TIME_HORIZON_PRESETS.map((preset) => (
              <PresetButton
                key={preset.key}
                type="button"
                $selected={timeHorizon === preset.key}
                onClick={() => onTimeHorizonChange(preset.key)}
              >
                {preset.label}
              </PresetButton>
            ))}
          </PresetRow>
        </Group>
      </FilterRow>

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

      <SpinButton type="button" onClick={onSpin} disabled={!canSpin}>
        {spinning ? "Finding a show..." : "Find a Show"}
      </SpinButton>
    </ControlsBox>
  );
};

export default ShuffleControls;
