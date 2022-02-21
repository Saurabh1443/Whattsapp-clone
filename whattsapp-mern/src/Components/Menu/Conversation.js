import React, { useEffect, useState } from 'react'
import './Conversation.css'

 let RID,SID;
 function Conversation({text,setStartChat,setConvId}) {
 const [Users,setUsers] = useState([]);
   
  useEffect(()=>{
    fetch('http://localhost:5000/getUsers')
    .then(res=>res.json()).then(data =>data.filter(user =>user.name.toLowerCase().includes(text.toLowerCase()))).then(data=>{setUsers(data); console.log(data)}).catch(err=>console.log(err));
   
  },[text])
  let localUser = localStorage.getItem('Users');
  localUser = JSON.parse(localUser) ;
  
       const setConversation = (Sid,Rid)=>{
             RID=Rid;
             SID=Sid;
          fetch("http://localhost:5000/conversation/add",{
             method:"post",
             body: JSON.stringify({ Sid, Rid}),
             headers:{
               "Content-type":"application/json"
             }
           }).then(result=>result.json()).then(res =>{
             if(res.status==="200"){setStartChat(res.user);}
           }).catch(err=>console.log(err));
    
            fetch("http://localhost:5000/getConversation",{
              method:"post",
              body: JSON.stringify({Sid, Rid}),
              headers:{
                "Content-type":"application/json"
              }
            }
              ).then(res=>res.json()).then(result=>{setConvId(result.id);console.log(result)}).catch(err=>console.log(err))

             }

  return (
    <div className="conver">
    <ul className = "Ulist">
      {
       Users.map((data,index)=>
       localUser.contact!==data.contact &&
        <div key ={index} className="list" onClick = {()=>{setConversation(localUser.contact,data.contact);
         
        }}>
        <div className="upper">
       <img src={data.profile_pic} alt="pic" />
       <h3 >{data.name}</h3>
       </div>
       <p>{data.contact}</p>
       
       </div>  
       )
      }
    </ul>
    </div>
  )
}

export default Conversation
export{RID,SID}