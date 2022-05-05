const express = require('express');
const mongoose = require('./config/connect.js');

const heroRoute = require('./routes/hero.js');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
//http://127.0.0.1:3000

app.use( '/hero' , heroRoute );


app.use( '/getimage' , express.static('./upload')  );


app.listen(  
    3000 
    ,
    ()=>{
        console.log('server work !!!!');
    }
    
);