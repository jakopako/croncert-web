import React from 'react'
import { Concert } from '../model'
import { format } from 'fecha'

const ConcertItem = ({title, location, city, comment, date}: Concert) => {
  return (
    <div className='concertitem__box'>
      <div className='concerttitle'>{title}</div>
      <div className='concertlocation'> {location}</div>
      <div className='concertcity'>{city}</div>
      <div className='concertcomment'> {comment}</div>
      <div>{format(date, 'DD.MM.YYYY hh:mm')}</div>
    </div>
  )
}

export default ConcertItem