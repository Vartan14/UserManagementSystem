require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const {urlencoded} = require("express");
const connectDB = require("./server/config/db");

const app = express();
const port = 3000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

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
