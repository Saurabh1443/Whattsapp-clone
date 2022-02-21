import {Server} from "socket.io";

const port = 3009;
let users =[];
const io = new Server(port,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on('connect',(socket)=>{
     console.log('user connected');

     socket.on('join',(Contact)=>{
        !users.find(data=>data.contact===Contact.contact)?users.push({contact:Contact.contact,id:socket.id}):null;
         console.log(users);

     })
     socket.emit('activeUser',(users));
     socket.on('sendMessages',({SID,RID,text})=>{
         console.log(text);
         console.log(RID);
         console.log(users);
         const target = users.find(function(data){
             if(data.contact===RID)return data;
         });
         console.log(target)
          io.to(target._id).emit('getMessages',{SID,text})
        
     })
})