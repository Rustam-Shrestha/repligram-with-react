const mongoose = require("mongoose");
// creating a table like structure for database like we do in mysql
const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})

//importing that schema with the name User
module.exports = mongoose.model("User", userSchema);








