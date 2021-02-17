const express = require('express')
const router = express.Router()
const Blog = require('../model/blog')
const cors = require('cors')
router.get('/blog', (req,res) =>{
    const userId = req.body.userId
    Blog.find({userId},function (err,posts) {
        if(err){
            res.send(err)
        }
        res.json(posts)
    })
})
router.post('/blog',(req,res) =>{

})

router.use(cors())
module.exports = router