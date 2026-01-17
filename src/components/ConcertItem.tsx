import React from "react";
import { Concert } from "../model";
import {
  LinkTextColor,
  LinkTextHoverColor,
  LinkColorTransitionDuration,
  GenreTagBackgroundColor,
  GenreTagTextColor,
} from "./Constants";
import { format, parseISO } from "date-fns";
import styled from "styled-components";

export const ConcertItemWrapper = styled.div`
  padding: 10px 0 10px 0;
  margin: 0 20px 0 20px;
  font-size: 30px;
`;

export const ConcertItemField = styled.div`
  position: relative;
  text-align: left;
`;

const ConcertItemTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 5px 5px 2px 5px;

  a {
    color: ${LinkTextColor};
    text-decoration: none;
    transition: ${LinkColorTransitionDuration};
  }

  a:hover {
    color: ${LinkTextHoverColor};
  }
`;

const ConcertItemGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0px 0px 5px;
`;

const ConcertItemGenre = styled.div`
  font-size: 12px;
  margin: 2px;
  padding: 2px;
  background-color: ${GenreTagBackgroundColor};
  color: ${GenreTagTextColor};
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
`;

const ConcertItemLocation = styled.div`
  font-size: 16px;
  padding: 2px 0 2px 5px;

  a {
    color: ${LinkTextColor};
    text-decoration: none;
    transition: ${LinkColorTransitionDuration};
  }

  a:hover {
    color: ${LinkTextHoverColor};
  }
`;

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
    <ConcertItemWrapper>
      <ConcertItemField>
        <ConcertItemTitle>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        </ConcertItemTitle>
      </ConcertItemField>
      <ConcertItemField>
        <ConcertItemGenres>
          {genres &&
            genres.map((genre) => (
              <ConcertItemGenre key={genre}>{genre}</ConcertItemGenre>
            ))}
        </ConcertItemGenres>
      </ConcertItemField>
      <ConcertItemField>
        <ConcertItemLocation>
          <b>{format(parseISO(date), "HH:mm")}</b>,{" "}
          <a href={sourceUrl} target="_blank" rel="noreferrer noopener">
            {location}
          </a>
          , {city}
        </ConcertItemLocation>
      </ConcertItemField>
    </ConcertItemWrapper>
  );
};
