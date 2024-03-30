const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginChecker = require("../middleware/loginChecker")
const Post = mongoose.model("Post")

router.post("/createpost",loginChecker,(req,res)=>{
    const{title, body} = req.body;
    if(!title || !body){
        return res.status(422).json({error: "need to give the post title and body"})
    }else{
       //we are supposed to run the post with our given title and body value  like this
        const post = new Post({
            title,
            body,
            // req.user will be from payload in loginchecker
            postedBy: req.user
        })
        post.save().then(result=>res.status(200).json({post:result})).catch(err=>{
            res.status(422).json({error:err})
        })
    }
}) 

module.exports = router;