const express = require("express");
const router = express.Router();

router.post("/signup",(req,res)=>{
    const {name, email, password} = req.body;
    if(!name | !email | !password){
        res.status(422).json({error:"give all the information"})
    }
    res.json({messsage:"datas sent successfully"})
    res.send("user authenthication site");
});
router.get("/",(req,res)=>{
    res.send("user authenthication site");
});

module.exports = router;