import React, { useEffect, useState } from "react";
import CroncertLogo from "./CroncertLogo";
import Footer from "./Footer";

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
      <h2 style={{ fontSize: "1.5em", margin: "12px 0" }}>Scraper Status</h2>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            /* Remove flex and justifyContent to allow full scroll */
          }}
        >
          <table
            style={{
              textAlign: "left",
              borderSpacing: columnPadding,
              minWidth: "600px",
              width: "1200px", // Fixed width for full scroll
              maxWidth: "1200px",
              fontSize: "1em",
              margin: "0 auto",
              // background: "white",
              // borderRadius: "8px",
              // boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "100px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "60px",
                  }}
                >
                  #Items
                </th>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "60px",
                  }}
                >
                  #Errors
                </th>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "120px",
                  }}
                >
                  Last Scrape
                </th>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "120px",
                  }}
                >
                  Scrape Duration
                </th>
                <th
                  style={{
                    paddingRight: columnPadding,
                    fontSize: "1em",
                    minWidth: "80px",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {status.map((s: any, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
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
                    {s.nrErrors === 0 ? (
                      (() => {
                        if (s.nrItems === 0) {
                          return (
                            <span
                              title="No items found"
                              style={{ cursor: "help" }}
                            >
                              ⚠️
                            </span>
                          );
                        }
                        return (
                          <span title="All OK" style={{ cursor: "help" }}>
                            ✅
                          </span>
                        );
                      })()
                    ) : (
                      <span title="Errors occurred" style={{ cursor: "help" }}>
                        ❌
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      <br />
      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 600px) {
          .App h2 {
            font-size: 1.1em !important;
          }
          .App table {
            font-size: 0.95em !important;
            min-width: 600px !important;
            width: 1200px !important;
          }
          .App th, .App td {
            padding-right: 6px !important;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Status;
