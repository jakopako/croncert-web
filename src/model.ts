export type Concert = {
  title: string;
  location: string;
  city: string;
  comment: string;
  url: string;
  date: string;
  sourceUrl: string;
  genres: string[];
}

export type Status = {
  scraperName: string;
  nrItems: number;
  nrErrors: number;
  lastScrapeStart: string;
  lastScrapeEnd: string;
  scraperLogs: string;
}