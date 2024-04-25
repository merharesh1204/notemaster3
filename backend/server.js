// Import required modules
const express = require('express');
const path = require('path');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const addnoteRoutes = require('./routes/addnoteRoutes');
const shownoteRoutes = require('./routes/shownoteRoutes');
const updatenoteRoutes = require('./routes/updatenoteRoutes');
// Create an instance of Express
const app = express();

// Define a route to serve the homepage
app.get('/', (req, res) => {
    // Send the index.html file
    res.sendFile(path.join(__dirname, '..', 'frontend', 'homepage', 'index.html'));
});

app.get('/signup.html', (req, res) => {
    // Send the signup.html file
    res.sendFile(path.join(__dirname, '..', 'frontend', 'signup', 'signup.html'));
});
app.get('/login.html', (req, res) => {
    // Send the signup.html file
    res.sendFile(path.join(__dirname, '..', 'frontend', 'login', 'login.html'));
});
app.get('/addnote.html', (req, res) => {
    // Send the signup.html file
    res.sendFile(path.join(__dirname, '..', 'frontend', 'addnote', 'addnote.html'));
});
app.get('/updatenote.html', (req, res) => {
    // Send the signup.html file
    res.sendFile(path.join(__dirname, '..', 'frontend', 'updatenote', 'updatenote.html'));
});
// Use the signup routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(addnoteRoutes);
app.use('/shownote.html', shownoteRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
