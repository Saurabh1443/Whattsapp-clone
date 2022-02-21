import React,{useEffect, useState} from "react";
import{AppBar,Toolbar,makeStyles,Box} from '@material-ui/core'
import Login from "./Login";
import Chatbox from "./Chatbox";

const useStyles = makeStyles({
    component:{
        background:"#DCDCDC",
        height:"100vh",   
    },
    loginHeader:{
        height:200,
        background: '#00bfa5',
        boxShadow:"none",
    }
})

const Messanger = ()=>{
    const[check,setCheck] = useState(false)
    const [imageSrc,setImage] =useState('')
    const [StartChat,SetStartChat] = useState([])
    const classes = useStyles();
    useEffect(()=>{
       if(localStorage.getItem('Users')){
           setCheck(true)
       }
       else{
           setCheck(false)
       }
    },[])
     
    return(
        <Box className={classes.component} >
            <AppBar className={classes.loginHeader}>
                <Toolbar >

                </Toolbar>
            </AppBar>
         {check ?<Chatbox fun={setCheck} dpImage={imageSrc} SetStartChat = {SetStartChat} StartChat ={StartChat} />:<Login fun = {setCheck} setDp={setImage}/>}
        </Box>
    )
}
export default Messanger