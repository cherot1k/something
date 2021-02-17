const app = require('./app');
const database = require('./database');

database().then(info =>{
    console.log(`Connected to ${info.host}:${info.port}/${info.name} `);
    console.log('biba');
})
    .catch(()=>{
   console.error("Unable to reconnect");
   process.exit(2);
});
app.listen(9000);
