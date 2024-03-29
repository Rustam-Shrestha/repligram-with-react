const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

// Define your secret pepper value
// usually comes from environment variable
const pepper = "bazinga";

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please provide all the information" });
    }

    // Combine password and pepper secret word
    const pepperedPassword = password + pepper;

    // select from database email matchings
    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" });
            } else {
                // hashing with salt value (automatically handled by bcrypt)
                // now password will generate the password with pepper hash
                bcrypt.hash(pepperedPassword, 10)
                    .then(pepperedPassword => {
                        // pass the peppered password instead of hashed password
                        const newUser = new User({
                            email, password: pepperedPassword, name
                        });
                        // insertion
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
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json({ error: "Failed to register user" });
        });
});

router.get("/", (req, res) => {
    res.send("User authentication site");
});

module.exports = router;
