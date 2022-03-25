import React from 'react'
import './styles.css'

const SearchField = () => {
  return (
  <form className='input'>
      <input type='input' placeholder='Search' className='input__box'/>
      {/* <button className='input__submit'>Go</button> */}
  </form>
  )
}

export default SearchField