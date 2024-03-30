const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../valuekeys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
    // from url bar gat the token that client sent to see if there is a token
    //is that token valid or if that token invalid
    const { authorization } = req.headers;
    // user trying to enter without login
    if (!authorization) {
        res.status(401).json({ error: "you must be logged in to continue" })
    }else{

        // removing extra parts from token
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ err: "you must be logged in to continue" })
        }
        const { _id } = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata
            // next will pass in the control to next functions
            next();
        });
    });
}
}