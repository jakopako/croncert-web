import React from 'react'
import './styles.css'

interface Props {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchField = ({handleFormSubmit}: Props) => {
  return (
  <form className='input' onSubmit={handleFormSubmit}>
      <input id='titlesearch' type='input' placeholder='Title' className='input__box_title'/>
      <input id='citysearch' type='input' placeholder='City' className='input__box_city'/>
      {/* <button className='input__submit'>Go</button> */}
  </form>
  )
}

export default SearchField