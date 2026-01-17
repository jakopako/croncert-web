import React from "react";
import styled from "styled-components";
import { Concert } from "../model";
import { ConcertItem } from "./ConcertItem";
import { DateItem } from "./DateItem";
import { NoConcerts } from "./NoConcerts";
import { LoadingPage } from "./LoadingPage";
import { ConcertListBackgroundColor, BorderColor } from "./Constants";

const ConcertListBox = styled.div`
  max-width: 800px;
  min-height: 900px;
  width: 90%;
  position: relative;
  background: ${ConcertListBackgroundColor};
  border: 1px solid ${BorderColor};
  margin-top: 20px;
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
`;

interface Props {
  loading: boolean;
  concerts: Concert[];
  setNotificationIsOpen: (value: boolean) => void;
}

const ConcertList = ({ concerts, loading, setNotificationIsOpen }: Props) => {
  var datesShown = new Set<string>();
  return (
    <ConcertListBox>
      <div>
        {loading && <LoadingPage />}
        {!loading &&
          concerts &&
          concerts.map((concert) => {
            var date = new Date(concert.date);
            date.setHours(0, 0, 0, 0);
            var dateString = date.toISOString();
            return (
              <div
                key={
                  concert.title +
                  concert.date +
                  concert.location +
                  concert.sourceUrl +
                  concert.url
                }
              >
                {!datesShown.has(dateString) && datesShown.add(dateString) && (
                  <DateItem date={date}></DateItem>
                )}
                <ConcertItem
                  title={concert.title}
                  location={concert.location}
                  city={concert.city}
                  comment={concert.comment}
                  url={concert.url}
                  date={concert.date}
                  sourceUrl={concert.sourceUrl}
                  genres={concert.genres}
                ></ConcertItem>
              </div>
            );
          })}
        {!concerts && !loading && (
          <NoConcerts setNotificationIsOpen={setNotificationIsOpen} />
        )}
      </div>
    </ConcertListBox>
  );
};

export default ConcertList;
