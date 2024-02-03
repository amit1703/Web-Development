const express = require('express');
const app = express();

const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');

const passport = require('passport');
const passportLocal = require('passport-local');

const User = require('./models/user')
const Review = require('./models/review')

const entryRouter = require('./routes/entry')
const reviewsRouter = require('./routes/review')





app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname,'views'))


app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))




//session
const sessionconfig = {
    secret: 'notsomuchsecret',
    resave: false,
    saveUninitialized: true,
    Cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*60*24*7,
        maxAge :  1000*60*60*60*24*7
    }
}
app.use(session(sessionconfig))





//passport(for registering and login)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//connection to db
mongoose.connect('mongodb://0.0.0.0:27017/fullApp', {}).then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    }).catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })





app.get('/',loginreq,(req,res,next)=>{
    res.send('home page')
})


//we put this router down because we need the sessions, passport and more to be active before we run the code inside entry file
app.use('/',entryRouter);
app.use('/reviews',reviewsRouter);


app.listen(8080, (req,res)=>{
console.log('on port 8080')
})