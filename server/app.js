// Require express
const express = require("express");
const app = express();
const PORT = 5000;

// Define custom middleware
const customMiddleware = (req, res, next) => {
    var a = 10;
    var b = 20;
    var c = a * b;
    console.log("Product is " + c);
    //if not used next() website will just load infinitely
    next(); // Call next to pass control to the next middleware or route handler
};

// // Use custom middleware
// app.use(customMiddleware);

// instead of doing aboce code we could pass it to a get endpoint like this 
app.get("/middle",customMiddleware, (req, res) => {
    res.send("middleware to a function check console");
});
// Define route handler for the root URL
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
