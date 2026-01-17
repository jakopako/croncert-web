import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CroncertLogo from "./CroncertLogo";
import Footer from "./Footer";

const StatusTitle = styled.h2`
  font-size: 1.5em;
  margin: 12px 0;
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const StatusTable = styled.table`
  text-align: left;
  border-spacing: 10px;
  min-width: 600px;
  width: 1200px;
  max-width: 1200px;
  font-size: 1em;
  margin: 0 auto;
`;

const TableHeader = styled.th`
  padding-right: 10px;
  font-size: 1em;

  &:nth-child(1) {
    min-width: 100px;
  }

  &:nth-child(2),
  &:nth-child(3) {
    min-width: 60px;
  }

  &:nth-child(4),
  &:nth-child(5) {
    min-width: 120px;
  }

  &:nth-child(6) {
    min-width: 80px;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
`;

const TableCell = styled.td`
  padding-right: 10px;
`;

const GitHubLink = styled.a`
  margin-left: 6px;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
`;

const StatusIcon = styled.span`
  cursor: help;
`;

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

  return (
    <div className="App">
      <CroncertLogo />
      <StatusTitle>Scraper Status</StatusTitle>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScrollContainer>
          <StatusTable>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>#Items</TableHeader>
                <TableHeader>#Errors</TableHeader>
                <TableHeader>Last Scrape</TableHeader>
                <TableHeader>Scrape Duration</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {status.map((s: any, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {s.scraperName}
                    <GitHubLink
                      href={`https://github.com/search?q=repo%3Ajakopako%2Fcroncert-config+path%3A%2F%5Econfig%5C%2F%2F+${s.scraperName}&type=code`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open in GitHub"
                    >
                      <span role="img" aria-label="Open in new tab">
                        🔗
                      </span>
                    </GitHubLink>
                  </TableCell>
                  <TableCell>{s.nrItems}</TableCell>
                  <TableCell>{s.nrErrors}</TableCell>
                  <TableCell>{s.lastScrapeStart}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {s.nrErrors === 0 ? (
                      (() => {
                        if (s.nrItems === 0) {
                          return (
                            <StatusIcon title="No items found">⚠️</StatusIcon>
                          );
                        }
                        return <StatusIcon title="All OK">✅</StatusIcon>;
                      })()
                    ) : (
                      <StatusIcon title="Errors occurred">❌</StatusIcon>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </StatusTable>
        </ScrollContainer>
      )}
      <br />
      <br />
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
