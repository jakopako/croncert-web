import React from "react";
import { Concert } from "../model";
import { format, parseISO } from "date-fns";

export const ConcertItem = ({
  title,
  location,
  city,
  url,
  date,
  sourceUrl,
  genres,
}: Concert) => {
  return (
    <div className="concertitem__box">
      <div className="concertitem__field">
        <div className="concertitem__title">
          <a href={url} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </div>
      </div>
      <div className="concertitem__field">
        <div className="concertitem__genres">
          {genres &&
            genres.map((genre) => (
              <div className="concertitem__genre" key={genre}>
                {genre}
              </div>
            ))}
        </div>
      </div>
      <div className="concertitem__field">
        <div className="concertitem__location">
          <b>{format(parseISO(date), "HH:mm")}</b>,{" "}
          <a href={sourceUrl} target="_blank" rel="noreferrer noopener">
            {location}
          </a>
          , {city}
        </div>
      </div>
    </div>
  );
};

// export default ConcertItem;
