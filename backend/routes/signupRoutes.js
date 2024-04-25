// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an instance of Express router
const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usersdata'
});

// Middleware for parsing request bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Route for handling signup form submission
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    // Insert user data into the database
    pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error occurred while registering user');
        }
        // If registration is successful, redirect to login.html
        res.redirect('/login.html');
    });
});

// Export the router
module.exports = router;
