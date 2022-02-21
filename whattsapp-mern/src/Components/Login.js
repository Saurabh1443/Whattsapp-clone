import React from 'react'
import { Dialog } from '@material-ui/core';
import './Login.css'
import { useState, useEffect, useContext } from 'react';
import { makeStyles, Typography, List, ListItem, Box, withStyles } from '@material-ui/core';

const useStyles = makeStyles({
    component:{
    display:'flex',
    flexDirection:"row"
    },
    leftComponent:{
   padding:"50px 0 30px 40px",
    },
    qr:{
        height:150,
        width:150,
        paddingTop:"45px",
        paddingRight:"10px"
    },
    typo:{
        color:"#525252",
        fontSize:"20px",
        marginBottom:"25px",
        fontFamily:"Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif"
    }
}) 

const styles={
    dialogPaer:{
        height:"95%",
        width:"60%",
        marginTop:"12%",
        borderRadius:"0px",
   maxHeight:"100%",
    maxWidth:"100%",
    }
}
const url = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';
function Login({classes,fun,setDp}) {
   
    const [contact,setContact] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const[check,setCheck] =useState(true)
    const [profile_pic,setPic] =useState('')
       
    const classname = useStyles();

const signup = async()=>{
    try{
        
   let user = await fetch("http://localhost:5000/register",{
        method:"post",
        body: JSON.stringify({ name, contact, password,profile_pic}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    user = await user.json();
    if(user.status==="200"){alert(`${user.message}`)}
    else{
    localStorage.setItem('Users',JSON.stringify(user))
    fun(true);
    }
}catch(error){
    alert('enter correct credentials')
    console.log(error);
}  
}
const login =async()=>{
    try{
        let result = await fetch("http://localhost:5000/login",{
        method:"post",
        body: JSON.stringify({ contact, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
        )
       result = await result.json();
       if(result.status==="404" || result.status==="405"){
           alert(`${result.message}`)
       }
       else{
        localStorage.setItem('Users',JSON.stringify(result))
        fun(true)
       }
    }
    catch(err){
  console.log(err);
    }
}
  return (
   <>
   <Dialog open={true} classes = {{paper:classes.dialogPaer}}
   BackdropProps = {{style:{backgroundColor:"unset"}}}
   >
       <Box className={classname.component}>
       <Box className={classname.leftComponent}>
        <Typography className={classname.typo}>
            To use whattsapp on your computer
        </Typography>
        <List>
            <ListItem>
                1. Open whattsapp on your phone
            </ListItem>
            <ListItem>
                2.Tap Menu Settings and select WhatsApp Web
            </ListItem>
            <ListItem>
                3.Point your phone to this screen to capture the code
            </ListItem>
        </List>
       </Box>
       <Box>
           <img src={url} alt ="qr" className={classname.qr}/>
       </Box>
       
       </Box>
       <div className="register">
         {
                
                check?(
                    <div className="signup">
                    <h1>Register to start the chat</h1>
                    <input type= "text" placeholder='Name' value = {name} onChange = {e=>setName(e.target.value)} /><br />
                    <input type="text" placeholder='contact' value = {contact} onChange={e=>setContact(e.target.value)} /><br />
                    <input type="text" placeholder='password' value = {password} onChange = {e=>setPassword(e.target.value)}/><br />
                    <input type="text" placeholder='Please provide image link' value = {profile_pic} onChange = {e=>setPic(e.target.value)}/><br />
                    <button onClick = {signup} >Sign up</button>
                    <button onClick={()=>{setCheck(false);setDp(profile_pic)}} className="btn2"><span>Already have an account login</span></button>
                    </div>
                 ):
                 (
             <div className="login">
             <h1>Login to start the chat</h1>
             <input type="text" placeholder='contact' value = {contact} onChange={e=>setContact(e.target.value)} /><br />
             <input type="text" placeholder='password' value = {password} onChange = {e=>setPassword(e.target.value)}/><br />
             <button onClick = {login} >Login</button>
             </div>
             )  
      }
       </div>
   </Dialog>
   
   </>
  )
}

export default withStyles(styles)(Login)