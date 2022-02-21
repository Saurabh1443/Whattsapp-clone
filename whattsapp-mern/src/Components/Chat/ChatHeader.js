import React, { useEffect } from 'react'
import {Box,Typography,makeStyles} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MoreVert from '@material-ui/icons/MoreVert'
import { RID,SID } from '../Menu/Conversation'

const useStyles = makeStyles({
   header:{
         display:"flex",
         backgroundColor:"#ededed",
         height:40,
         padding:"10px 13px",
         alignItems:"center",
     
      },
          dp:{
        height:35,
        wiidth:45,
        borderRadius:"50%",
      paddingRight:"12px"
   
   },
   RightIcon:{
     marginLeft:"auto",
   },
   search:{
     padding:"6px",
     color:"green",
     cursor:"pointer"
   },
   typo:{
     fontSize:13,
     color:"#919191"
   }
})

function ChatHeader({StartChat,activeUsers,contact}) {
useEffect(()=>{
   console.log(contact);
   console.log(activeUsers)
},[])
  const classes = useStyles()
  return (
    <Box className = {classes.header}>
      <img src = "https://latestmodapks.com/wp-content/uploads/2017/04/image_20170412_112801_55-2.jpg" alt = "dp" className={classes.dp}/>
      <Box>
        <Typography>{StartChat.name}</Typography>
        <Typography className = {classes.typo}>{
           activeUsers.find(data=>data.contact ===RID)?"Online":"offline"
        }</Typography>
      </Box>
      <Box className = {classes.RightIcon}>
        <SearchIcon className={classes.search} />
        <MoreVert className = {classes.search}/>
      </Box>
    </Box>
  )
}

export default ChatHeader