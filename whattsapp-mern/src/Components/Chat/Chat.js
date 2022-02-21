import { StylesContext } from '@material-ui/styles'
import React, { useEffect } from 'react'
  import ChatHeader from './ChatHeader'
  import Messages from './Messages'
const Styles ={
    header:{
       overflowX:"hidden",
    
    
    }
}

function Chat({StartChat,convId,activeUsers,contact}) {
  useEffect(()=>{
console.log(convId)
  },[convId])
  return (
    <div style = {Styles.header}>
    <ChatHeader StartChat={StartChat} activeUsers={activeUsers} contact={contact}/>
    <Messages  convId={convId}/>
    </div>
  )
}

export default Chat