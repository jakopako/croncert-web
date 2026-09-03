export type EventTimeRange = {
  fromTime: Date;
  toTime?: Date;
};

export const getEventTimeRange = (
  date?: Date,
  now: Date = new Date(),
): EventTimeRange => {
  if (!date) return { fromTime: now };

  const fromTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return {
    fromTime,
    toTime: new Date(fromTime.getTime() + 24 * 60 * 60 * 1000),
  };
};
