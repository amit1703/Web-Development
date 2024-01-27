const express = require('express');// server
const app = express();
const mongoose = require('mongoose')//db
const User = require('./models/User')



mongoose.connect('mongodb://localhost:27017/temp', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const makeUser = async()=>{
    const user = await new User({
        name: 'amit',
        age: 15
    })
    user.save()


}

app.get('/show',async(req,res)=>{
     const user =  makeUser();

     res.render('show.ejs',{user})
    
  
})




app.listen(8080,()=>{
    console.log('on port 8080')
})

    


