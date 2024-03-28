// we require express
const  express = require("express");
const app = express();
const PORT = 5000;

// in each get request URL parameter is checked and executed
app.get("/", (req,res)=>{
    res.send("hello world");
})

// Navigation link to the project in console
app.listen(PORT, ()=>{
    console.log("server is running in http://localhost:"+PORT)
})