import { fetchShuffleEvents } from "./shuffleApi";

test("queries shuffle events using the next 24-hour time range", async () => {
  const response = { ok: true, json: jest.fn().mockResolvedValue({ data: [] }) };
  global.fetch = jest.fn().mockResolvedValue(response) as jest.Mock;

  await fetchShuffleEvents({ baseUrl: "https://example.com", radiusKm: 15 });

  const requestUrl = new URL((global.fetch as jest.Mock).mock.calls[0][0]);
  const fromTime = requestUrl.searchParams.get("fromTime");
  const toTime = requestUrl.searchParams.get("toTime");

  expect(fromTime).toMatch(/Z$/);
  expect(toTime).toMatch(/Z$/);
  expect(new Date(toTime!).getTime() - new Date(fromTime!).getTime()).toBe(
    24 * 60 * 60 * 1000,
  );
  expect(requestUrl.searchParams.has("date")).toBe(false);
});
