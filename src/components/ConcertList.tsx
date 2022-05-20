import React from "react";
import { Concert } from "../model";
import ConcertItem from "./ConcertItem";
import ReactPaginate from "react-paginate";
import { NoConcerts } from "./NoConcerts";
import "./styles.css";

interface Props {
  concerts: Concert[];
  page: number;
  totalPages: number;
  handlePagination: (selectedItem: { selected: number }) => void;
}

const ConcertList = ({
  concerts,
  page,
  totalPages,
  handlePagination,
}: Props) => {
  return (
    <div className="concertlist__box">
      <div>
        {concerts &&
          concerts.map((concert) => (
            <ConcertItem
              key={
                concert.title +
                concert.date +
                concert.location +
                concert.sourceUrl
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
        {!concerts && <NoConcerts />}
      </div>
      <div className="pagination">
        {concerts && (
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
