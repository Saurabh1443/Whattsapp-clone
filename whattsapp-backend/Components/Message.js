const mongoose = require("mongoose");

const Messages = new mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    conversationId:{
        type:String,
        required:true
    },
    text:{
        type:String,
    },
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model("message", Messages);