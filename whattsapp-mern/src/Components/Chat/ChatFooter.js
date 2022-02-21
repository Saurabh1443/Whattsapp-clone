import React from 'react'
import{Box,makeStyles,InputBase} from '@material-ui/core'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import AttachFile from '@material-ui/icons/AttachFile'
import Mic from '@material-ui/icons/Mic'
const useStyles = makeStyles({
  footer:{
    height:"50px",
    backgroundColor:"#ededed",
    color:"black",
    width:"100%",
    display:"flex",
    alignItems:"center",
    padding:"0 15px",
    '& >*':{
  margin:5,
  color:"#919191",
    },
  },
    clipIcon:{
      transform:"rotate(40deg)",
      cursor:"pointer"
    },
    input:{
      backgroundColor:"white",
   
      borderRadius:"10px",
      width:"46vw",
    },
    emoji:{
      cursor:"pointer"
    },
    mic:{
      cursor:"pointer",
      color:"green"
    }
  }
)
function ChatFooter({sendText,setText,text}) {

  const classes = useStyles()
  return (
    <Box className ={classes.footer}>
      <EmojiEmotions className = {classes.emoji}/>
      <AttachFile  className={classes.clipIcon}/>
      <Box>
        <InputBase placeholder='type a message' className={classes.input} value={text} onKeyPress={e=>{sendText(e);setState(true)}} onChange={e=>setText(e.target.value)}/>
      </Box>
      <Mic className = {classes.mic}/>
      </Box>
  )
}

export default ChatFooter