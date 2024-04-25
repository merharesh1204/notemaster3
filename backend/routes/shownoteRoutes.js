// routes/shownote.js
const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notesdata' // Assuming you have a database named 'notesdata'
});

// Route to fetch and display notes
router.get('/', (req, res) => {
    // Query to fetch notes from the database
    pool.query('SELECT * FROM notes', (error, results, fields) => {
        if (error) {
            res.status(500).send('Error occurred while fetching notes');
        } else {
            // Convert the fetched notes to HTML
            const htmlContent = generateHTML(results);
            // Write the HTML content to a file
            const filePath = 'C:\\Users\\abc\\Desktop\\enotes\\frontend\\shownote\\shownote.html'
            fs.writeFile(filePath, htmlContent, (err) => {
                if (err) {
                    res.status(500).send(__dirname);
                } else {
                    // Send the generated HTML file
                    res.sendFile(filePath);
                }
            });
        }
    });
});

// Function to generate HTML from fetched notes
function generateHTML(notes) {
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>NoteMaster - Show Notes</title>
            <style>
                /* Paste the CSS styles here */
                /* Reset CSS */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* Global Styles */
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }

                .container {
                    width: 80%;
                    margin: 0 auto;
                }

                header {
                    background-color: #333;
                    color: #fff;
                    padding: 20px 0;
                }

                header h1 {
                    margin: 0;
                }

                nav ul {
                    list-style-type: none;
                }
                .container ul {
                    padding: 0;
                }
                
                .container ul li {
                    list-style: none;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    padding: 10px;
                }
                
                .container ul li h3 {
                    margin-bottom: 5px;
                    color: #333;
                }
                
                .container ul li p {
                    color: #666;
                }

                nav ul li {
                    display: inline;
                    margin-right: 20px;
                }

                nav ul li a {
                    color: #fff;
                    text-decoration: none;
                }

                .welcome-section {
                    background-color: #f4f4f4;
                    padding: 50px 0;
                    text-align: center;
                }

                .features-section {
                    padding: 50px 0;
                }

                .features-section h2 {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .feature {
                    margin-bottom: 20px;
                }
                .container ul li{
                    text-decoration:none;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 20px 0;
                }
            </style>
        </head>
        <body>
            <header>
                <div class="container">
                    <h1>NoteMaster</h1>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/addnote.html">Add Notes</a></li>
                            <li><a href="/update.html">Updates Notes</a></li>
                            <li><a href="/shownote.html">Show Notes</a></li>
                            <li><a href="/login.html">Login</a></li>
                            <li><a href="/signup.html">Sign Up</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        
            <section class="welcome-section">
                <div class="container">
                    <h2>Notes</h2>
                    <ul>
    `;
    notes.forEach(note => {
        htmlContent += `
            <li>
                <h3>Title:  ${note.title}</h3>
                <p>Discription:  ${note.description}</p>
            </li>
        `;
    });
    htmlContent += `
                    </ul>
                </div>
            </section>
        
            <footer>
                <div class="container">
                    <p>&copy; 2024 NoteMaster. All rights reserved.</p>
                </div>
            </footer>
        </body>
        </html>
    `;
    return htmlContent;
}



module.exports = router;
