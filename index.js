
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();

const BlogPost = require('./models/BlogPost.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendex:true}));

app.use(fileUpload());


const validateMiddleWare = (req, res, next) => {
    if(req.files === null || req.body.title === null || req.body.title === null) {
        return res.redirect('/posts/new');
    }
    next();
}

app.use('/posts/store', validateMiddleWare);



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


app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), 
    async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    });
});




