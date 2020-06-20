
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const validateMiddleWare = require('./middleware/validationMiddleware');
const expressSession = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express();


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendex:true}));

app.use(fileUpload());

app.use('/posts/store', validateMiddleWare);

app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.use(flash());


app.listen(3000, () => {
    console.log("App listening on port 3000");
});



const authMiddlware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

const newPostController = require('./controllers/newPost');
app.get('/posts/new', authMiddlware, newPostController);

const homeController = require('./controllers/home');
app.get('/', homeController);

const getPostController = require('./controllers/getPost');
app.get('/post/:id', getPostController);

const storePostController = require('./controllers/storePost');
app.post('/posts/store', authMiddlware, storePostController);

const newUserController = require('./controllers/newUser');
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

const storeUserController = require('./controllers/storeUser');
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

const loginController = require('./controllers/login');
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

const loginUserController = require('./controllers/loginUser');
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

const logoutController = require('./controllers/logout');
app.get('/auth/logout', logoutController);


app.use((req, res) => res.render('notfound'));

