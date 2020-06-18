
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();

const BlogPost = require('./models/BlogPost.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendex:true}));


app.listen(3000, () => {
    console.log("App listening on port 3000");
});



app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
});


app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('about');
});


app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    });
    console.log(req.params);
});


app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render('contact');
});


app.get('/posts/new', (req, res) => {
    res.render('create');
});


app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body);
    res.redirect('/');
});




