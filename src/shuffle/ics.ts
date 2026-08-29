import { ShuffleEvent } from "./model";

const ASSUMED_DURATION_HOURS = 2;

const toIcsDate = (date: Date): string =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const escapeIcsText = (text: string): string =>
  text.replace(/[\\,;]/g, (match) => "\\" + match).replace(/\n/g, "\\n");

// Builds a minimal single-event RFC5545 .ics file and triggers a browser download.
// No end time is provided by the API, so the duration is a heuristic.
export const buildIcsAndDownload = (event: ShuffleEvent): void => {
  const start = new Date(event.date);
  const end = new Date(start.getTime() + ASSUMED_DURATION_HOURS * 3600 * 1000);
  const location = [event.location, event.city].filter(Boolean).join(", ");
  const descriptionParts = [event.comment, event.url].filter(Boolean);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//croncert-web//shuffle//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}-${encodeURIComponent(event.title)}@croncert-shuffle`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(descriptionParts.join(" - "))}`,
    `URL:${event.sourceUrl || event.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${event.title.replace(/[^a-z0-9]+/gi, "-")}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};
