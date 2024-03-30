const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginChecker = require("../middleware/loginChecker")
const Post = mongoose.model("Post")


router.get("/allpost",(req,res)=>{
    // fetch post database and also fetch id and name of post owner
    Post.find().populate("postedBy", "_id name").then(posts=>{
        res.status(200).json(posts);
    }).catch(err=>{
        res.status(422).json(err)
    })

})
router.get("/myposts",loginChecker,(req,res)=>{
    console.log("User:", req.user);
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(myposts => {
            console.log("My Posts:", myposts);
            res.status(200).json(myposts);
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(422).json(err);
        });

})

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