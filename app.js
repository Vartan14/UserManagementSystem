require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {urlencoded} = require("express");
const flash = require('express-flash');
const session = require('express-session');
const connectDB = require("./server/config/db");

const app = express();
const port = 3000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },  // 1 week
}));

// Flash Messages
app.use(flash({ sessionKeyName: 'express-flash-message' }));

// Templating Engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

// Routes
app.use('/', require('./server/routes/customer'));

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
