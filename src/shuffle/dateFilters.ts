import { addHours } from "date-fns";

export type DateWindow = {
  start: Date;
  end: Date;
};

// Hardcoded time horizon: only show gigs starting within the next 24 hours.
export const getNext24HoursWindow = (now: Date = new Date()): DateWindow => ({
  start: now,
  end: addHours(now, 24),
});

export const isDateWithinWindow = (
  isoDate: string,
  window: DateWindow,
): boolean => {
  const date = new Date(isoDate);
  return date >= window.start && date <= window.end;
};

