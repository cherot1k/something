const express = require('express')
const router = express.Router();
const Post = require('../model/post')
const Message = require('../model/message')
const cors = require('cors');

router.get('/message',(req,res) =>{
    const {id} = req.body
    const messages = Message.find({post_id :id})
    if(messages){
        res.send(messages)
    }
    else {
        res.send('Error,try later')
    }
})
router.post('/messages',(req,res) =>{

})

router.get('/posts',(req,res) =>{
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
router.post('/posts',(req,res)=>{
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
router.use(cors())

module.exports = router