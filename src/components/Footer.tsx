import React from 'react'
import logo from './github.png'

const Footer = () => {
  return (
    <div className='footer__box'>
        <a href='https://github.com/jakopako/croncert-web' target='_blank' rel='noreferrer noopener'>
            <img src={logo} alt="Github Logo" width="30" height="30"/>
        </a>
        <div className='contribute__box'><a href='https://github.com/jakopako/croncert-config' target='_blank' rel='noreferrer noopener'>Contribute</a></div>
    </div>
  )
}

export default Footer