const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    img:{
      type:String,
      required:false
    },
    body:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },


});

schema.set('toJSON',{
    virtuals:true
});

module.exports = mongoose.model('Blog',schema);