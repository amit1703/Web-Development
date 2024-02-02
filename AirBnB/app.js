const express = require('express');// server
const app = express();
const path = require('path')
const mongoose = require('mongoose')//db
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash')
 

const apartments = require('./routes/apartments')
const reviews = require('./routes/reviews')

const AppError = require('./AppError')




app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname,'views'))
app.engine('ejs', ejsMate)

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))


mongoose.connect('mongodb://localhost:27017/AirBnB', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })




const seesionconfig = {
    secret: 'notsomuchsecret',
    resave: false,
    saveUninitialized: true,
    Cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*60*24*7,
        maxAge :  1000*60*60*60*24*7
    }
}
app.use(session(seesionconfig))



// up to here, is a must 



app.get('/' , (req,res)=>{

    res.render('home')
})

app.use('/apartments', apartments)
app.use('/apartments/:id/reviews', reviews)

app.all('*', (req,res,next)=>{

    return next(new AppError('page not found',404))
})

app.use((err, req ,res ,next)=>{ // need checking if can be deleted 
    //when will be an express error(like route exist but there is an error there) then this function will run
    console.log('error ', err)
    next(err)
})
app.use((err, req ,res , next)=>{

    const { message = 'somthing went wrong', status = 500} = err;
    res.status(status).render('error',{message, status})
})


app.listen(3000, ()=>{
    console.log('on port 3000')
})
















