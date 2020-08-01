const mongoose = require('mongoose');

module.exports = () =>{
    return new Promise((resolve,reject)=>{
        mongoose.Promise=global.Promise;
        mongoose.set('debug',true);

        mongoose.connection
            .on('error',error => reject(error))
            .on('close',()=> console.log("Database connection close"))
            .once('open',()=>resolve(mongoose.connection));

        mongoose.connect('mongodb://localhost/post' , {useMongoClient:true});
        var db = mongoose.connection;
    });
};