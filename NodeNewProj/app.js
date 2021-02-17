
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express();
const cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/message')




app.use(express.static(__dirname +'./database'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(
    session({
        secret:"I love to eat chips",
        resave:true,
        saveUninitialized:false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);
app.use(cors());
app.use('/',blogRoutes)
app.use('/',authRoutes)
app.use('/',messageRoutes)


module.exports = app;
