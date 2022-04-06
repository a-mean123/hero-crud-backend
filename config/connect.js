// 1
const mongoose = require('mongoose');
// 2
mongoose.connect( 'mongodb://127.0.0.1:27017/hero' )
    .then(
        ()=>{
            console.log('connected to db !');
        }
    )
    .catch(
        ()=>{
            console.log('error in connection');
        }
    )

// 3
module.exports = mongoose;