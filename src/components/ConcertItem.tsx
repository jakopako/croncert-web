import React from 'react'
import { Concert } from '../model'
import { format, parseISO } from "date-fns";

const ConcertItem = ({title, location, city, comment, url, date, sourceUrl}: Concert) => {
  return (
    <div className='concertitem__box'>
      <div className='concertitem__field'>
        <div className='concertitem__title'><a href={url} target='_blank' rel='noreferrer noopener'>{title}</a></div>
      </div>
      <div className='concertitem__field'><div className='concertitem__location'><a href={sourceUrl} target='_blank' rel='noreferrer noopener'>{location}</a>, {city}</div></div>
      <div className='concertitem__field'><div className='concertitem__date'>{format(parseISO(date), "dd.MM.yyyy HH:mm")}</div></div>
    </div>
  )
}

export default ConcertItem