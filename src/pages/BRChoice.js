
import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import { choices } from '../constants/Menu'

function BRChoice ({navigation})  {
  return (
    <>
      <Content menus={choices} navigation={navigation}/>
      <Footer/>
    </>
    
  )
}

export default BRChoice