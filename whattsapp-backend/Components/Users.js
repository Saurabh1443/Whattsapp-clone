const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
       min:3,
       max:20,
     
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:20,
        lowercase:true
       },
    profile_pic:{
        type:String,
       
    },
   
    addedon:{
    type:String,
    default:""
    }

})
module.exports = mongoose.model("users", UserSchema);