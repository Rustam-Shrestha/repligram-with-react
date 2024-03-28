
const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const {MONGOURI} = require("./valuekeys.js");
require("./models/user");

// requiring the router that has been created inside routes folder
// to get data in json format we need to use this json() middleware
app.use(express.json())
app.use(require("./routes/auth.js"))

mongoose.connect(MONGOURI);
mongoose.connection.on("connected",()=>{
    console.log("we are connected to the mongodb database")
});

// same as die("error") in php
mongoose.connection.on("error",()=>{
    console.log("unsuccessful connecting to the mongodb database")
});











// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
