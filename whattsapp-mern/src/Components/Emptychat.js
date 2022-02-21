
import React from 'react'
import {Box,makeStyles} from '@material-ui/core'
const useStyles = makeStyles({
    component:{
        background:"#f8f9fa",
        height:"100%",
        padding:"50px,0",
        textAlign:"center"
    },
    image:{
        height:430,
   width:"90%"
    }
})
function Emptychat() {
    const classes = useStyles()
  return (
    <Box className ={classes.component}>
        <img src = "https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png" alt ="background"  className = {classes.image}/>
    </Box>
  )
}

export default Emptychat