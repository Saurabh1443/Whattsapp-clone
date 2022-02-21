const express = require('express');
require('./Components/config');
const app = express();
const cors = require("cors");
const user = require('./Components/Users');
 const Conversation = require('./Components/Conversation');
 const messages = require('./Components/Message')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
   
let check = await user.findOne({contact:req.body.contact}).lean();
 
if(check){
    return res.json({status:"200",message:"you are already registered please login"})
}
else{

    try{
        req.body.password = await bcrypt.hash(req.body.password,10);
    const users = new user(req.body);
    let result = await users.save();
  result = await result.toObject();
    return res.json(result)
    }catch(err){
    console.log(err);
    }
}
})
app.post('/login',async(req,res)=>{

    let users  = await user.findOne({contact:req.body.contact}).lean();
    console.log(users);

    if(users){
    let pass = await bcrypt.compare(req.body.password,users.password);
    console.log(pass)
    if(!pass){
        return res.json(users)
    }
    else{
        return res.json({status:"404",message :"Wrong password"})
    }
}
else{
    return res.json({status:"405",message :"New user! please register"})
}
  
})
app.post('/conversation/add',async(req,res)=>{
    const{Sid,Rid} = req.body;
    let exist = await Conversation.findOne({members:{$all:[Sid,Rid]}})
    if(exist){
        let usersExist = await user.findOne({contact:Rid});
        return res.json({user:usersExist,status:"200"});
    }

    let newConversation = new Conversation({
        members:[Sid,Rid]
    }) 
   newConversation = await newConversation.save();
  let users = await user.findOne({contact:newConversation.members[1]})
   return res.json({user:users,status:"200"});

})
app.get('/getUsers',async(req,res)=>{
    try{
       let users = await user.find();
       return res.json(users)
    }catch(err){
   console.log(err);
    }
})
app.post('/getConversation',async(req,res)=>{
    try{
    const{Sid,Rid} = req.body
    let users = await Conversation.findOne({members:{$all:[Sid,Rid]}});
    return res.json({id:users.id,status:"ok"})
    }catch(error){
   console.log(error)
    }
})
app.post('/send/messages',async(req,res)=>{
    let Messages = new messages(req.body);
    try{
       await Messages.save();
       return res.json({message:"message saved successfully"})
    }catch(err){
        console.log(err)
          return res.json({message:"message idnt saved"})
    }
    
})
app.get('/displayMessages/:convId',async(req,res)=>{
    try{
        console.log(req.params.convId)
    let data = await messages.find({conversationId
        :req.params.convId
    });
    console.log(data);
    return res.status(200).json(data) 

}
catch(err){
  console.log(err)
}
})
app.listen(5000,(req,res)=>{console.log("listening")})