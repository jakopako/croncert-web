import React from "react";
import { Concert } from "../model";
import ConcertItem from "./ConcertItem";
import { NoConcerts } from "./NoConcerts";
import { LoadingPage } from "./LoadingPage";
import "./styles.css";

interface Props {
  loading: boolean;
  concerts: Concert[];
  setNotificationIsOpen: (value: boolean) => void;
}

const ConcertList = ({ concerts, loading, setNotificationIsOpen }: Props) => {
  return (
    <div className="concertlist__box">
      <div>
        {loading && <LoadingPage />}
        {!loading &&
          concerts &&
          concerts.map((concert) => (
            <ConcertItem
              key={
                concert.title +
                concert.date +
                concert.location +
                concert.sourceUrl +
                concert.url
              }
              title={concert.title}
              location={concert.location}
              city={concert.city}
              comment={concert.comment}
              url={concert.url}
              date={concert.date}
              sourceUrl={concert.sourceUrl}
              genres={concert.genres}
            ></ConcertItem>
          ))}
        {!concerts && !loading && (
          <NoConcerts setNotificationIsOpen={setNotificationIsOpen} />
        )}
      </div>
    </div>
  );
};

export default ConcertList;
