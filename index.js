
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.listen(3000, () => {
    console.log("App listening on port 3000");
});



app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('about');
});


app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
    res.render('post');
});


app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render('contact');
});




