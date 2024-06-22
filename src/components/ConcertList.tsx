import React from "react";
import { Concert } from "../model";
import ConcertItem from "./ConcertItem";
import { NoConcerts } from "./NoConcerts";
import { LoadingPage } from "./LoadingPage";
import "./styles.css";

interface Props {
  loading: boolean;
  concerts: Concert[];
  // page: number;
  // totalPages: number;
  // handlePagination: (selectedItem: { selected: number }) => void;
  setNotificationIsOpen: (value: boolean) => void;
}

const ConcertList = ({
  concerts,
  loading,
  // page,
  // totalPages,
  // handlePagination,
  setNotificationIsOpen,
}: Props) => {
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
