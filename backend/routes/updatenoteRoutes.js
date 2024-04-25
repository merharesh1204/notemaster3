// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an instance of Express router
const router = express.Router();


// Middleware for parsing request bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Route for handling login form submission
router.post('/updatenote', (req, res) => {
    // Check if the user exists in the database
    res.redirect("/login.html")
});

// Export the router
module.exports = router;
