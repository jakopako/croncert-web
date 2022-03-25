import React from 'react'
import { Concert } from '../model'
import ConcertItem from './ConcertItem'

interface IConcerts {
  concerts: Concert[]
}

const ConcertList = ({concerts}: IConcerts) => {
  // const c1:Concert = {
  //   title: "title1",
  //   location: '',
  //   city: '',
  //   comment: '',
  //   date: new Date()
  // }
  return (
    <div className='concertlist__box'>
      {concerts.map((concert) => (
        <ConcertItem title={concert.title} location={concert.location} city={concert.city} comment={concert.comment} url={concert.url} date={concert.date}></ConcertItem>
      ))}
        {/* <ConcertItem title={c1.title} location={''} city={''} comment={''} date={new Date()} /> */}
    </div>
  )
}

export default ConcertList