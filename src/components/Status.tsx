import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CroncertLogo from "./CroncertLogo";
import Footer from "./Footer";
import { Status as StatusType } from "../model";
import { DarkBorderColor, LightTextColor, BorderColor } from "./Constants";

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

  &:nth-child(7) {
    min-width: 60px;
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

const LogsButton = styled.button`
  background: none;
  border: 1px solid currentColor;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  padding: 2px 8px;
  color: inherit;

  &:hover {
    opacity: 0.7;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${DarkBorderColor};
  color: ${LightTextColor};
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4em;
  cursor: pointer;
  color: inherit;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const LogsContainer = styled.pre`
  overflow-y: auto;
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 12px;
  font-size: 0.85em;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  text-align: left;
  color: ${LightTextColor};
`;

interface Props {
  baseUrlFromEnv: string;
}

const Status = ({ baseUrlFromEnv }: Props) => {
  const [loading, setLoading] = useState(true);
  const [baseUrlStatus] = useState(baseUrlFromEnv + "/api/status");
  const [status, setStatus] = useState<StatusType[]>([]);
  const [pageSize, setPageSize] = useState(1);
  const [logsModalOpen, setLogsModalOpen] = useState(false);
  const [logsScraperName, setLogsScraperName] = useState("");
  const [logsContent, setLogsContent] = useState("");
  const [logsLoading, setLogsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Focus the close button when the modal opens
  useEffect(() => {
    if (logsModalOpen) {
      closeButtonRef.current?.focus();
    }
  }, [logsModalOpen]);

  // Close the modal on Escape key
  useEffect(() => {
    if (!logsModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLogs();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsModalOpen]);

  const openLogs = async (scraperName: string) => {
    // Cancel any in-flight request before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLogsScraperName(scraperName);
    setLogsContent("");
    setLogsLoading(true);
    setLogsModalOpen(true);
    try {
      const url =
        baseUrlStatus +
        "?name=" +
        encodeURIComponent(scraperName) +
        "&returnScraperLogs=true";
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }
      const resJson = await res.json();
      const data = resJson["data"];
      const logs =
        data && data.length > 0 && data[0].scraperLogs
          ? data[0].scraperLogs
          : "No logs available.";
      setLogsContent(logs);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setLogsContent(
        `Failed to load logs: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setLogsLoading(false);
    }
  };

  const closeLogs = () => {
    setLogsModalOpen(false);
    setLogsScraperName("");
    setLogsContent("");
  };

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
                <TableHeader>Logs</TableHeader>
              </tr>
            </thead>
            <tbody>
              {status.map((s: StatusType, index) => (
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
                  <TableCell>
                    <LogsButton
                      type="button"
                      onClick={() => openLogs(s.scraperName)}
                      title={`View logs for ${s.scraperName}`}
                      aria-label={`View logs for ${s.scraperName}`}
                    >
                      📋
                    </LogsButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </StatusTable>
        </ScrollContainer>
      )}
      {logsModalOpen && (
        <ModalOverlay onClick={closeLogs}>
          <ModalContent
            role="dialog"
            aria-modal="true"
            aria-labelledby="logs-modal-title"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle id="logs-modal-title">
                Logs: {logsScraperName}
              </ModalTitle>
              <ModalCloseButton
                type="button"
                ref={closeButtonRef}
                onClick={closeLogs}
                aria-label="Close logs"
              >
                ✕
              </ModalCloseButton>
            </ModalHeader>
            <LogsContainer>
              {logsLoading ? "Loading logs..." : logsContent}
            </LogsContainer>
          </ModalContent>
        </ModalOverlay>
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
