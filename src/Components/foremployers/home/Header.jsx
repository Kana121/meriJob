import { Flex } from '@chakra-ui/react'
import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
          <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
          <div className="header-search-bar-div">
            <input type="text" className="search-bar" />
            <BsSearch  className='icon'/>
          </div>
          
        </div>
        <Flex className='header-right'>
          <BsFillBellFill className='icon'/>
          <BsFillEnvelopeFill className='icon'/>
          <BsPersonCircle className='icon'/>
        </Flex>
    </header>
  )
}

export default Header
