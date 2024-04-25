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

// Route for handling login form submission
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if the user exists in the database
    pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
        if (error) {
            return res.status(500).send('Error occurred while logging in');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        // User exists, you can proceed with login logic here
        return res.redirect('/shownote.html');
    });
});

// Export the router
module.exports = router;
