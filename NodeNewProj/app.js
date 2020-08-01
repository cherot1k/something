var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy
var app = express();
var cors = require('cors');
const User = require('./model/user')
const Post = require('./model/post')
const Blog = require('./model/blog')
const Message = require('./model/message')
const bcrypt = require('bcrypt-nodejs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const jwt      = require('jsonwebtoken')
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
// view engine setup
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

    app.post('/login', function(req, res, next) {
        const login = req.body.login
        const password = req.body.password
        User.findOne({login}).then(user=>{
            console.log(user)
            if(!user){
              return res.send('Something wrong')
            }
            bcrypt.compare(password,user._doc.password,function (err,result) {
                if(!result){
                  console.log('Error in login');
                }else{
                    const token = jwt.sign({user:user}, 'privateKey');

                    return res.send({user, token});
                }
            })
        }).catch(e=>{
            res.send(e)
        })
    });
app.get('/login/user',(req,res)=>{
    res.send(req.user)
})
app.get('/logout', function(req, res){
    req.logout();
    console.log("logged out")
    return res.send();
});
app.get('/blog',(req,res) =>{
    const username = req.body.username
    const posts = Blog.find({username})
    res.send(posts)
})

app.get('/blog', (req,res) =>{
    const userId = req.body.userId
    Blog.find({userId},function (err,posts) {
        if(err){
            res.send(err)
        }
        res.json(posts)
    })
})
app.post('/blog',(req,res) =>{

})
app.get('/posts',(req,res) =>{
    console.log(req.body)
    const login = req.query.login
    Post.find({
        username:login
    },function (err,posts) {
        if(err){
            res.send(err)
        }
        console.log(posts)
        res.json(posts)
    });
});
app.post('/posts',(req,res)=>{
        req.body.forEach(e =>{
        const title = e.title;
        const body = e.body;
        const id = e.id;
        const deadline = e.date;
        const username = e.username
        Post.create({
            inner_id:id,
            title,
            body,
            deadline,
            username
        })
    })

});
//post req
    app.post ( '/reg', function (req, res) {
        console.log ( req.body );
        const {login,password,username} = req.body
        // there i can tell about error,and parameters of login or password

       const someUser = User.findOne ( {
            login
        } )
            if (!someUser.login) {
                bcrypt.hash ( password, null, null, function (err, hash) {

                    User.create ( {
                        login: login,
                        password: hash,
                        name : username

                    } ).then ( user => {
                        console.log ( user );
                        const token = jwt.sign({user:user}, 'privateKey');
                        return res.send({user, token});
                    } )
                } )
            } else {
                console.error ( 228 );
            }
    } );
 app.get('/message',(req,res) =>{
     const {id} = req.body
     const messages = Message.find({post_id :id})
     if(messages){
        res.send(messages)
     }
     else {
         res.send('Error,try later')
     }
 })
app.post('/messages',(req,res) =>{

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
