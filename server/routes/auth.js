const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User")

router.post("/signup",(req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"Please provide all the information"});
    }
    
    User.findOne({email: email})
        .then(savedUser => {
            if(savedUser){
                return res.status(422).json({error:"User already exists with that email"});
            } else {
                const newUser = new User({
                    email, password, name
                });

                newUser.save()
                    .then(user => {
                        res.json({message:"User registered successfully"});
                    })
                    .catch(err => {
                        console.error("Error saving user:", err);
                        res.status(500).json({error: "Failed to register user"});
                    });
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json({error: "Failed to register user"});
        });
});
  
router.get("/", (req,res) => {
    res.send("User authentication site");
});

module.exports = router;
