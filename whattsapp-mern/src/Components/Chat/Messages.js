import React, { useEffect, useState } from 'react'
import ChatFooter from './ChatFooter'
import{Box,makeStyles, Typography} from '@material-ui/core'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import { socket } from '../Chatbox'
import { RID,SID } from '../Menu/Conversation'
const useStyles = makeStyles({
  wrapper:{
  backgroundImage:`url(${"https://i.pinimg.com/736x/92/35/c5/9235c5fda93a74c8931077bf11140cd6.jpg"})`,
  overFlow:"hidden",
  color:"white",
  backgroundSize:"50%",
  cursor:"pointer",
  
  },
  component:{
    height:"100vh",
  },
  own:{
    backgroundColor:"#dcf8c6",
    color:"black",
    padding:"5px",
      maxWidth:"30%",
  display:"flex",
    borderRadius:"10px",
   width:"fit content" ,
  marginLeft:"auto",
  marginRight:"10px",
  paddingRight:"0px",
  marginBottom:"4px",
  width:"max-content",
  flex:1
  },
  typo:{
    paddingRight:"20px",
  },
  typo2:{
color:"blue",
paddingTop:"5px",
color:"#919191"
  },
  wrapperSub:{
    background:"white",
    color:"black",
    maxWidth:"60%",
    display:"flex",
    borderRadius:"10px",
   width:"fit content" ,
  marginBottom:"4px",
  width:"max-content"
  }
})
function Messages({convId}) {
  const [text,setText] =useState('')
  const[messages,setMessages] = useState([])
  const [incommingMessages,setIncommingMessages] = useState({})
  let senderId = localStorage.getItem('Users');
  senderId = JSON.parse(senderId) ;
  senderId = senderId.contact;
   
   useEffect(()=>{
       socket.on('getMessages',(({SID,text})=>{
        setIncommingMessages({
          senderId:SID,
          text:text,
          createdAt:Date.now()
        });
       }))
    
   },[])

   useEffect(()=>{
     setMessages(prev=>[...prev,incommingMessages]);
     console.log(incommingMessages);
  
   },[incommingMessages])

  useEffect(()=>{
    const displayMessages = ()=>{
      fetch(`http://localhost:5000/displayMessages/${convId}`
      ).then(res=>res.json()).then(result=>setMessages(result)).catch(err=>console.log(err))
   }
   displayMessages();

  },[convId,incommingMessages]);
  useEffect(()=>{
    console.log(messages);
  },[convId])
  const sendText =(e)=>{

    if(!text)return;
    if(e.key === 'Enter'){
          
      socket.emit('sendMessages',({SID,RID,text}));

        let conversationId = convId;
        fetch("http://localhost:5000/send/messages",{
        method:"post",
       body:JSON.stringify({senderId,conversationId,text}),
        headers: {
      'Content-Type': 'application/json'
  }
   }).then(res=>res.json()).then(result=>console.log(result)).catch(err=>console.log(err));
   setText('');
    }
  }
  const classes = useStyles();
  return (
   <Box className = {classes.wrapper}>
     <ReactScrollToBottom className={classes.component}>
   {
     messages && messages.map((data,index)=>
       <Box className = {senderId === data.senderId ? classes.own:classes.wrapperSub}>
         <Typography className = {classes.typo}>
           {data.text} 
         </Typography>
         <Typography className = {classes.typo2}>
           {new Date(data.createdAt).getHours()}: {new Date(data.createdAt).getMinutes()}
         </Typography>
       </Box>
     )
   }
     </ReactScrollToBottom>
     <ChatFooter sendText={sendText} setText={setText} text ={text} />
   </Box>
  )
}

export default Messages