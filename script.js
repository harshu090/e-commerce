const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Mock user database
const users = {
    'johndoe': 'password123'
};

// Routes
app.get('/', (req, res) => {
    if (req.session.username) {
        res.redirect('/account');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] === password) {
        req.session.username = username;
        res.redirect('/account');
    } else {
        res.send("Invalid credentials.");
    }
});

app.get('/account', (req, res) => {
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        const userProfile = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '(123) 456-7890',
            profilePic: '/images/default-profile-pic.png'
        };
        res.render('account', { profile: userProfile });
    }
});

app.post('/account', (req, res) => {
    // Handle profile update
    res.redirect('/account');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    button.addEventListener('click', function() {
        alert('Button clicked!');
    });
});

