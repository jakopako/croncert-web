import React from 'react'
import { Concert } from '../model'
import ConcertItem from './ConcertItem'
import ReactPaginate from 'react-paginate';
import { NoConcerts } from './NoConcerts';
import './styles.css'

interface Props {
  concerts: Concert[];
  page: number;
  totalPages: number;
  handlePagination: (selectedItem: { selected: number; }) => void;
}

const ConcertList = ({ concerts, page, totalPages, handlePagination }: Props) => {
  return (
    <div className='concertlist__box'>
      <div>
        {concerts && concerts.map((concert) => (
          <ConcertItem key={concert.title + concert.date} title={concert.title} location={concert.location} city={concert.city} comment={concert.comment} url={concert.url} date={concert.date}></ConcertItem>
        ))}
        {!concerts && (<NoConcerts/>)}
      </div>
      <div className='pagination'>
        {concerts && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePagination}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          previousLabel="< "
        // renderOnZeroPageCount={null}
        />)}
      </div>
    </div>
  )
}

export default ConcertList