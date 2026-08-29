export type TimeHorizonKey = "next3Hours" | "tonight" | "thisWeekend";

export type TimeHorizonPreset = {
  key: TimeHorizonKey;
  label: string;
};

export const TIME_HORIZON_PRESETS: TimeHorizonPreset[] = [
  { key: "next3Hours", label: "Starting in the next 3 hours" },
  { key: "tonight", label: "Tonight" },
  { key: "thisWeekend", label: "This weekend" },
];
