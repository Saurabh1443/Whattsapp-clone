const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/whattsapp",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(res=>console.log(res)).catch(err=>console.log(error));