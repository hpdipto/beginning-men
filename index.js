
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const validateMiddleWare = require('./middleware/validationMiddleware');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendex:true}));

app.use(fileUpload());



app.use('/posts/store', validateMiddleWare);


app.listen(3000, () => {
    console.log("App listening on port 3000");
});




const newPostController = require('./controllers/newPost');
app.get('/posts/new', newPostController);

const homeController = require('./controllers/home');
app.get('/', homeController);

const storePostController = require('./controllers/storePost');
app.get('/post/:id', storePostController);

const getPostController = require('./controllers/getPost');
app.post('/posts/store', storePostController);

const newUserController = require('./controllers/newUser');
app.get('/auth/register', newUserController);

const storeUserController = require('./controllers/storeUser');
app.post('/users/register', storeUserController);

const loginController = require('./controllers/login');
app.get('/auth/login', loginController);

const loginUserController = require('./controllers/loginUser');
app.post('/users/login', loginUserController);

