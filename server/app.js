// Require express
// imporrt part
const express = require("express");
const app = express();
const PORT = 5000;
// using mongoose middleware in sql we already had all of them
//use npm i mongoose to get this middleware
const mongoose = require("mongoose");
// we get uri from mongodb cloud atlas when we input username and password and
//when we create a database
const {MONGOURI} = require("./valuekeys.js");


// connection part --=========================================================
// it is just like mysqli_connect in php with url that we used to do with jdbc
mongoose.connect(MONGOURI, {useNewUrlParser:true, useUnifiedTopology: true });
// when connection function returns connected then log the console with the message

mongoose.connection.on("connected",()=>{
    console.log("we are connected to the mongodb database")
});

// same as die("error") in php
mongoose.connection.on("error",()=>{
    console.log("unsuccessful connecting to the mongodb database")
});














// Define route handler for the root URL
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
