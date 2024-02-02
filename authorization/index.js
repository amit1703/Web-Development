const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session')
const User = require('./models/user');

mongoose.connect('mongodb://0.0.0.0:27017/AuthDemo', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    app.set('view engine' , 'ejs')
    app.use(express.urlencoded({extended: true}))



app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
        next();
    }


app.get('/',requireLogin,  (req,res)=>{
    res.send('home page')
})

app.get('/login',(req,res, next)=>{
    res.render('login')
})
app.post('/login',async(req,res,next)=>{
    //login post
    const {username, password} = req.body
    const user = await User.findOne({username: username})
    if(user){
        if(bcrypt.compare(password, user.hpassword)){
            req.session.user = user; // Storing user in session
            res.redirect('/')
        }  
    }

    else{
        res.send('check your credentials')
    }
    
})

app.get('/register', (req,res,next)=>{
    res.render('register')
})
app.post('/register',async(req,res,next)=>{
    try{

    
    //register post
    const {username, password} = req.body
    const hpw = await bcrypt.hash(password , 12)
    const user = new User({
        username: username,
        hpassword: hpw
    })
    await user.save()
    req.session.user = user; // Storing user in session
    res.redirect('/')
}
catch(e){
    next(e)
}
})

app.get('*',(req,res)=>{
    res.send('404, page not found')
})
app.use((err , req ,res, next)=>{

    res.render('error')

})
app.listen(3000, (req,res)=>{
console.log('on port 3000')
})