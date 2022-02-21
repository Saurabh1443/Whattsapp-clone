import React,{useState} from 'react'
import {Drawer,makeStyles} from '@material-ui/core'
import './InfoDrawer.css'

const useStyles = makeStyles({
    root:{
    },
    paper:{
      left:"33px",
      top:"12px",
      height:"95%",
     maxWidth:"33%",
    backgroundColor:"black"
    },
    h2:{
   height:"90px",
   backgroundColor:"#e5e5e5",
    display:"flex",
    justifyContent:"center",
    alignItems:"flex-end",
   bottom:"3px",
   position:"relative",
   backgroundImage:"linear-gradient(100deg,red,blue,green,pink )"
    },
   img:{
       height:"120px",
       width:"140px",
      margin:"auto",
      marginTop:"20px",
      borderRadius:"50%"
   },
   p:{
       color:"green"
   },
   input:{
       color:"pink",
       width:"100px",
       outline:"none",
       border:"none",
       backgroundColor:"black",
       marginTop:"10px",
       marginBottom:"10px"
   },
   small:{
       color:"white"
   },
   div:{
   display:"flex"
   },
   btn:{
       height:"10px",
       width:"10px",
       border:"none",
       color:"white",
       paddingLeft:"0px"
   },
   h4:{
       color:"pink",
       marginTop:"15px",
       marginBottom:"10px"
   },
   main_div:{
       marginLeft:"5px",
       paddingTop:"10px"
   }
})
function InfoDrawer({open ,fun}) {
    const[name,setName] = useState('');
    const[trigger,setTrigger] = useState(false)
    const classes = useStyles()
  return (
    <Drawer open ={open} onClose={()=>fun(false)} classes = {{
        root:classes.root,
        paper:classes.paper
    }} className={classes.drawer}>
        <h2 className = {classes.h2}>Profile</h2>
        <img src= "https://www.drshaneholmes.com/wp-content/uploads/2020/03/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" className ={classes.img}/>
        <div className={classes.main_div}>
            <p className = {classes.p}>Your name</p>
            <div className = {classes.div}>{ !trigger?(
                <>
            <input className ={classes.input}type = "text" placeholder = "Type your name" value = {name}  onChange = {e=>setName(e.target.value)}/>
            <button className = {classes.btn} onClick={()=>setTrigger(true)} type="button">Go</button><br />
            </>
            ):(
                <h4 className = {classes.h4}>{name}</h4>
            )
            }
            </div>
            <small className = {classes.small}>This is not your username or pin.This name will be visible to your Whattsapp contacts</small>
            <p className = {classes.p}>About</p>
        </div>
    </Drawer>
  )
}
export default InfoDrawer