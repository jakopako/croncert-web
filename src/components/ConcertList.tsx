import React from "react";
import { Concert } from "../model";
import ConcertItem from "./ConcertItem";
import ReactPaginate from "react-paginate";
import { NoConcerts } from "./NoConcerts";
import { LoadingPage } from "./LoadingPage";
import "./styles.css";

interface Props {
  loading: boolean;
  concerts: Concert[];
  page: number;
  totalPages: number;
  handlePagination: (selectedItem: { selected: number }) => void;
}

const ConcertList = ({
  concerts,
  loading,
  page,
  totalPages,
  handlePagination,
}: Props) => {
  return (
    <div className="concertlist__box">
      {/* <div
        style={{
          backgroundImage: "linear-gradient(#578672,  #7eacb3)",
          // position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></div> */}
      <svg
        style={{
          // position: "fixed",
          opacity: 0.6,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>

        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
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
        {!concerts && !loading && <NoConcerts />}
      </div>
      <div className="pagination">
        {concerts && !loading && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePagination}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel="<"
          />
        )}
      </div>
    </div>
  );
};

export default ConcertList;
