import { getEventTimeRange } from "./eventTime";

test("uses now as fromTime when no date is selected", () => {
  const now = new Date("2026-09-03T15:26:54.255Z");

  expect(getEventTimeRange(undefined, now)).toEqual({ fromTime: now });
});

test("creates a local midnight to 24-hour range for a selected date", () => {
  const selectedDate = new Date(2026, 8, 3, 18, 30);
  const { fromTime, toTime } = getEventTimeRange(selectedDate);

  expect(fromTime.getFullYear()).toBe(2026);
  expect(fromTime.getMonth()).toBe(8);
  expect(fromTime.getDate()).toBe(3);
  expect(fromTime.getHours()).toBe(0);
  expect(fromTime.getMinutes()).toBe(0);
  expect(toTime!.getTime() - fromTime.getTime()).toBe(24 * 60 * 60 * 1000);
});
