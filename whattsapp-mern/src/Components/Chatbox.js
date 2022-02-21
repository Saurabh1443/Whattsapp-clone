import { Dialog,Box,makeStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React,{useEffect, useState} from 'react'
import Menu from "./Menu/Menu"
import Chat from './Chat/Chat'
import Emptychat from './Emptychat'
import {io} from 'socket.io-client';

let socket;
const useStyles = makeStyles({
    component:{
        display:"flex",
    },
    leftComponent:{
        flex:"35%",
    },
    rightComponent:{
        flex:"65%",
        borderLeft:"1px solid green",
     overflowY:"hidden"
    }
})

const styles={
    dialogPaper:{
        height:"95%",
        width:"91%",
        borderRadius:"0px",
   maxHeight:"100%",
    maxWidth:"100%",
    }
}

function Chatbox({classes,fun,dpImage,SetStartChat,StartChat}) {
    const[convId,setConvId] = useState('')
    const[activeUsers,setActiveUsers]= useState([])
   
    let localUser = localStorage.getItem('Users');
  localUser = JSON.parse(localUser) ;
  //:console.log(localUser.contact);
    useEffect(()=>{
     socket = io('http://localhost:3009');
       socket.on('connect',()=>{
         console.log('client connected');

       })
       socket.emit('join',{contact:localUser.contact})
       socket.on('activeUser',(user)=>{
         setActiveUsers(user);
       })
    },[])
    
    const classname = useStyles();
  return (
   <Dialog open = {true} classes = {{paper:classes.dialogPaper}} BackdropProps = {{style:{backgroundColor:"unset"}}}>
       <Box className = {classname.component}>
        <Box className = {classname.leftComponent}>
          <Menu fun ={fun} dpImage = {dpImage} setStartChat={SetStartChat} setConvId={setConvId} />
        </Box>
        <Box className = {classname.rightComponent}>
          { convId? <Chat StartChat ={StartChat} convId = {convId} activeUsers={activeUsers} contact = {localUser.contact}/> :<Emptychat />}
        </Box>
       </Box>
        </Dialog>
  )
}

export default withStyles(styles)(Chatbox)
export {socket}
 