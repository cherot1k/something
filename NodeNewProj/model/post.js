const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    inner_id:{
      type:Number,
      required:true,
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    }
});

schema.set('toJSON',{
    virtuals:true
});

module.exports = mongoose.model('Post',schema);