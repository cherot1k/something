const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    post_id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required:true
    }
});

schema.set('toJSON',{
    virtuals:true
});

module.exports = mongoose.model('Message',schema);