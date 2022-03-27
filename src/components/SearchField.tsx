import React from 'react'
import './styles.css'

interface Props {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchField = ({handleFormSubmit}: Props) => {
  return (
  <form className='input' onSubmit={handleFormSubmit}>
      <input id='titlesearch' type='input' placeholder='Search' className='input__box'/>
      {/* <button className='input__submit'>Go</button> */}
  </form>
  )
}

export default SearchField