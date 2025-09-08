import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";

interface Props {
  baseUrlFromEnv: string;
}

const Status = ({ baseUrlFromEnv }: Props) => {
  const [loading, setLoading] = useState(true);
  const [baseUrlStatus] = useState(baseUrlFromEnv + "/api/status");
  const [status, setStatus] = useState([]);
  const [pageSize, setPageSize] = useState(1);

  // Make one call to figure out how many items there are in total
  useEffect(() => {
    (async () => {
      const url = baseUrlStatus + "?limit=" + pageSize;
      const res = await fetch(url);
      const res_json = await res.json();
      setPageSize(res_json["total"]);
      setStatus(res_json["data"]);
      // setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pageSize > 1) {
      (async () => {
        const url = baseUrlStatus + "?limit=" + pageSize;
        const res = await fetch(url);
        const res_json = await res.json();
        setStatus(res_json["data"]);
        setLoading(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  const columnPadding = "10px";

  return (
    <div className="App">
      <CroncertLogo />
      <h2>Scraper Status</h2>
      <br />
      {/* Legend for status icons */}
      <div style={{ marginBottom: "16px", fontSize: "1em", textAlign: "left" }}>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            margin: "8px 0 0 0",
            display: "flex",
            gap: "24px",
          }}
        >
          <li>
            <span role="img" aria-label="Info">
              ℹ️
            </span>{" "}
            <strong>Status Legend:</strong>
          </li>
          <li>
            <span role="img" aria-label="No items">
              ⚠️
            </span>{" "}
            No items found
          </li>
          <li>
            <span role="img" aria-label="Errors">
              ❌
            </span>{" "}
            Errors occurred
          </li>
          <li>
            <span role="img" aria-label="OK">
              ✅
            </span>{" "}
            All OK
          </li>
        </ul>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ textAlign: "left", borderSpacing: columnPadding }}>
          <thead>
            <tr>
              <th style={{ paddingRight: columnPadding }}>Name</th>
              <th style={{ paddingRight: columnPadding }}>#Items</th>
              <th style={{ paddingRight: columnPadding }}>#Errors</th>
              <th style={{ paddingRight: columnPadding }}>Last Scrape</th>
              <th style={{ paddingRight: columnPadding }}>Scrape Duration</th>
              <th style={{ paddingRight: columnPadding }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {status.map((s: any, index) => (
              <tr key={index}>
                <td style={{ paddingRight: columnPadding }}>
                  {s.scraperName}
                  <a
                    href={`https://github.com/search?q=repo%3Ajakopako%2Fcroncert-config+path%3A%2F%5Econfig%5C%2F%2F+${s.scraperName}&type=code`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: "6px",
                      verticalAlign: "middle",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    aria-label="Open in GitHub"
                  >
                    <span role="img" aria-label="Open in new tab">
                      🔗
                    </span>
                  </a>
                </td>
                <td style={{ paddingRight: columnPadding }}>{s.nrItems}</td>
                <td style={{ paddingRight: columnPadding }}>{s.nrErrors}</td>
                <td style={{ paddingRight: columnPadding }}>
                  {s.lastScrapeStart}
                </td>
                <td style={{ paddingRight: columnPadding }}>
                  {s.lastScrapeStart && s.lastScrapeEnd
                    ? (() => {
                        const durationSec =
                          (new Date(s.lastScrapeEnd).getTime() -
                            new Date(s.lastScrapeStart).getTime()) /
                          1000;
                        if (durationSec >= 60) {
                          const minutes = Math.floor(durationSec / 60);
                          const seconds = (durationSec % 60).toFixed(2);
                          return `${minutes}m ${seconds}s`;
                        }
                        return `${durationSec.toFixed(2)}s`;
                      })()
                    : "N/A"}
                </td>
                <td style={{ paddingRight: columnPadding }}>
                  {s.nrErrors === 0
                    ? (() => {
                        if (s.nrItems === 0) {
                          return "⚠️";
                        }
                        return "✅";
                      })()
                    : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <br />
    </div>
  );
};

export default Status;
