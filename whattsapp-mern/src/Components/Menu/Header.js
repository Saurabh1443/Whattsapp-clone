import React,{useState} from 'react'
import { Box } from '@material-ui/core'
import Chat from "@material-ui/icons/Chat"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Drawer from '../Drawer/InfoDrawer';
import {MenuItem,Menu} from '@material-ui/core';

const styles = {
    header:{
        display:"flex",
      justifyContent:"space-between",
      height:"60px",
      backgroundColor:" #d9d9d9" 
    },
    image:{
        height:"40px",
       marginTop:"5px",
       marginLeft:"5px",
        borderRadius:"40%",
        backgroundColor:"blue",
        cursor:"pointer"
    },
    icons:{
        marginRight:7,
        marginTop:5,
    },
    subicons:{
        paddingRight:15,
        cursor:"pointer"
    },
    morevert:{
      cursor:"pointer"
    }
}
function Header({fun,dpImage}) {
 const[open,setOpen] = useState(false)
 const[toggle ,setToggle] = useState(false)

 const handleClose = () => {
  localStorage.removeItem("Users")
  fun(false)
    setOpen(false);
  };
  const handleOpen = (event) => {
  const temp =event.currentTarget;
  console.log(temp);
    setOpen(event.currentTarget);
  };
  
  const Logout =()=>{
    if (localStorage.getItem('Users') != null)
  localStorage.removeItem('Users');

  handleClose();
  }
  return (
    <>
    <Box style ={styles.header}>
        <img src={dpImage} alt="dp" style = {styles.image} onClick ={()=>setToggle(!toggle)} />
        <Box style ={styles.icons}>
            <Chat style={styles.subicons}/>
            <MoreVertIcon onClick={handleOpen} style ={styles.morevert}>
            </MoreVertIcon>
            <Menu
        anchorEl={open}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
             vertical:"bottom",
             horizontal:"center"
        }}
        transformOrigin={{
            vertical:"top",
            horizontal:"right"
        }}
      
      >
        <MenuItem onClick={()=>{setToggle(true);setOpen(false)}}>Profile</MenuItem>
        <MenuItem onClick={Logout}>Logout</MenuItem>
      </Menu> 
        </Box>
    </Box>
    <Drawer open = {toggle} fun ={setToggle}/>
    </>

  )
}

export default Header