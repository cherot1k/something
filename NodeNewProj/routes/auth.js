const express = require('express');
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyparser = require('body-parser')

router.use(bodyparser.json())

router.post('/login', function(req, res, next) {
    console.log(req.body)
    const login = req.body.login
    const password = req.body.password
    User.findOne({login}).then(user=>{
        console.log(user)
        if(!user){
            return res.send('Something wrong')
        }
        bcrypt.compare(password,user._doc.password,function (err,result) {
            if(!result){
                console.log('Error in login')
            }else{
                const token = jwt.sign({user:user}, 'privateKey')

                return res.send({user, token})
            }
        })
    }).catch(e=>{
        res.send(e)
    })
});

router.post ( '/reg', function (req, res) {
    console.log ( req.body )
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
                console.log ( user )
                const token = jwt.sign({user:user}, 'privateKey')
                return res.send({user, token})
            } )
        } )
    } else {
        console.error ( 228 );
    }
} )

router.get('/login/user',(req,res)=>{
    res.send(req.user)
})
router.get('/logout', function(req, res){
    req.logout();
    console.log("logged out")
    return res.send()
});

router.use(cors)

module.exports= router