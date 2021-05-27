const mongoose = require('mongoose') ;
const config=require('config') ;
const dbUrl= process.env.MONGO_URI;

const db= async ()  => {
    try{
    await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}) ;
    
console.log('MonoDB Connected')
    } catch(err){
    console.log(err.message)
     process.exit(1)
} ;

} ;

module.exports=db ;