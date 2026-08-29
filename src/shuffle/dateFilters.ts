import { addDays, addHours, endOfDay, setHours, setMinutes } from "date-fns";
import { TimeHorizonKey } from "./presets";

export type DateWindow = {
  start: Date;
  end: Date;
};

const startOfWeekendFrom = (now: Date): Date => {
  const day = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
  if (day === 5 || day === 6 || day === 0) {
    // already Fri/Sat/Sun: weekend "starts" now
    return now;
  }
  const daysUntilFriday = 5 - day;
  return setMinutes(setHours(addDays(now, daysUntilFriday), 18), 0);
};

const endOfWeekendFrom = (now: Date): Date => {
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  return endOfDay(addDays(now, daysUntilSunday));
};

export const getTimeHorizonWindow = (
  key: TimeHorizonKey,
  now: Date = new Date(),
): DateWindow => {
  switch (key) {
    case "next3Hours":
      return { start: now, end: addHours(now, 3) };
    case "tonight":
      return { start: now, end: endOfDay(now) };
    case "thisWeekend":
      return { start: startOfWeekendFrom(now), end: endOfWeekendFrom(now) };
    default:
      return { start: now, end: endOfDay(now) };
  }
};

export const isDateWithinWindow = (
  isoDate: string,
  window: DateWindow,
): boolean => {
  const date = new Date(isoDate);
  return date >= window.start && date <= window.end;
};
