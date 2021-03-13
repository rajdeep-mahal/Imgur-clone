var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var mysqlStore      = require('express-mysql-session')(session);
var handlebars = require('express-handlebars');
var cookieParser    = require('cookie-parser');
// Routes
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var postsRouter     = require('./routes/posts');
var commentsRouter  = require('./routes/comments');
var app             = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            // if u need more helpers u can register them here
        }
    })
);

// Sessions
var sessionStore = new mysqlStore({ /* Using default options */ }, require('./conf/database'));
var sessionOptions = {
    key: 'csid',
    secret: 'This is my secret csc317',
    store: sessionStore,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 9000000,
        sameSite: true
    },
    resave: true,
    saveUninitialized: false,
};

// Express settings
app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Displaying error page on backend malfunctions.
app.use((err, req, res, next) => {
    res.render('error', {root: 'views'});
});

module.exports = app;
