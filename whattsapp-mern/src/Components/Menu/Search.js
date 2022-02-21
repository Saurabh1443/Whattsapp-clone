import React,{useState} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
         icon:{
           marginTop:"5px",
           color:"green"
         }
})

let styles = {
  search:{
    display:"flex",
   backgroundColor:"#d9d9d9",
  marginTop:"4px"
  },
  search_icon:{
    backgroundColor:"white",
    borderRadius:"10px",
    marginTop:"5px",
    marginBottom:"5px",
    marginLeft:"5px",
    padding:"0px",
    width:"90%",
     outline:"none",
     color:"black",
     fontSize:"12px"
  }

}

function Search({setText}) {
  const classname = useStyles();
  return (
   <>
   <div style={styles.search}>
     <SearchIcon className ={classname.icon} fontSize="small"/>
     <div style = {styles.search_icon}>
       <input type="text" placeholder='Search or start a new chat' style ={styles.search_icon} onChange={e=>setText(e.target.value)} />
     </div>
   </div>
   </>
  )
}

export default Search