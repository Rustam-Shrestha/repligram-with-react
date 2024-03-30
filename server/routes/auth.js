const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../valuekeys")


// Define your secret pepper value
const pepper = "bazinga";

// Define your secret pepper value

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please provide all the information" });
    }

    // Check if the email already exists in the database
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(422).json({ error: "Email already exists" });
            }

            // Hash the raw password
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    // Create a new user with the hashed password
                    const newUser = new User({
                        email, password: hashedPassword, name
                    });

                    // Save the user to the database
                    newUser.save()
                        .then(user => {
                            res.json({ message: "User registered successfully" });
                        })
                        .catch(err => {
                            console.error("Error saving user:", err);
                            res.status(500).json({ error: "Failed to register user" });
                        });
                })
                .catch(err => {
                    console.error("Error hashing password:", err);
                    res.status(500).json({ error: "Failed to register user" });
                });
        })
        .catch(err => {
            console.error("Error finding existing user:", err);
            res.status(500).json({ error: "Failed to register user" });
        });
});




router.get("/", (req, res) => {
    res.send("User authentication site");
});

module.exports = router;


router.post("/signin", (req, res) => {
    // Taking user-given email and password by destructuring
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please enter email and password" });
    }

    // Find the user by email in the database
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email" });
            }

            // Hash the raw password with the pepper and compare it with the hashed password stored in the database
            bcrypt.compare(password, savedUser.password)
                .then(matched => {
                    if (!matched) {
                        return res.status(422).json({ error: "Invalid password" });
                    }
                    const token = jwt.sign({id:savedUser._id}, JWT_SECRET)

                    res.json({token});
                })
                .catch(err => {
                    console.error("Error comparing passwords:", err);
                    res.status(500).json({ error: "Failed to sign in" });
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json({ error: "Failed to sign in" });
        });
});

router.get("/", (req, res) => {
    res.send("User authentication site");
});

module.exports = router;
