import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversation from './Conversation'
function Menu({fun,dpImage,setStartChat,setConvId}) {
const[text,setText]=useState('')

  return (
    <>
    <Header fun={fun} dpImage={dpImage}/>
    <Search setText = {setText}/>
    <Conversation text = {text} setStartChat= {setStartChat} setConvId={setConvId} />
    </>
  )
}

export default Menu