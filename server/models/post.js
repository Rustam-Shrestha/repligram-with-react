const mongoose = require("mongoose");
//in mongoose objectid is user id and this will be imported and used as userid
const {ObjectId} = mongoose.Schema.Types

// creating a table like structure for database like we do in mysql
const postSchema  = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    image:{
        type:String,
        default:"no photos"
    },
    postedBy:{
        type:ObjectId,
        ref: "User"

    }
})

//importing that schema with the name User
module.exports = mongoose.model("Post", postSchema);

