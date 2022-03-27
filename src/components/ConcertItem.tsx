import React from 'react'
import { Concert } from '../model'
import { format, parseISO } from "date-fns";

const ConcertItem = ({title, location, city, comment, url, date}: Concert) => {
  return (
    <div className='concertitem__box'>
      <div className='concertitem__field'>
        <div className='concertitem__title'><a href={url} target='_blank' rel='noreferrer noopener'>{title}</a></div>
      </div>
      <div className='concertitem__field'><div className='concertitem__location_city'>{location}, {city}</div></div>
      {/* <div className='concertitem__field'><div className='concertitem__city'>{city}</div></div> */}
      {/* <div className='concertitem__field'><div className='concertitem__comment'>{comment}</div></div> */}
      {/* <div className='concertitem__field'><div className='concertitem__date'>{format(date, 'DD.MM.YYYY hh:mm')}</div></div> */}
      <div className='concertitem__field'><div className='concertitem__date'>{format(parseISO(date), "dd.MM.yyyy HH:mm")}</div></div>
      {/* <div className='concertitem__field'>{city}</div>
      <div className='concertitem__field'> {comment}</div>
      <div className='concertitem__field'>{format(date, 'DD.MM.YYYY hh:mm')}</div> */}
    </div>
  )
}

export default ConcertItem