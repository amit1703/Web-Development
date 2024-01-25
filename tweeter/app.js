const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const ejsMate = require('ejs-mate');// for boilerplate
const { Resolver } = require('dns');
const app = express();
const User = require('./models/User')
const Tweet = require('./models/Tweet')


app.engine('ejs', ejsMate)
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))


mongoose.connect('mongodb://localhost:27017/tweets', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.get('/tweets',async (req,res)=>{
    const tweets = await Tweet.find({}).populate('user', 'name')


    
    
    res.render('Tweet/show',{tweets})
})

app.get('/register', (req,res)=>{
    res.render('User/new')
})

app.post('/tweets', async (req,res)=>{
    const {name,age} = req.body;
    const user = new User({
        name: name,
        age: age
    })
    await user.save()
    res.redirect('/tweets')

})
app.get('/userlist',async(req,res)=>{

    const users = await User.find({})
    res.render('User/list',{users})


})
app.get('/:id' , async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    const tweets = await Tweet.find({}).populate('user')
    const final =[]

    for(let i = 0  ; i<tweets.length; i++){
        if(tweets[i].user._id == id)
        final.push(tweets[i])
    console.log(final)

    }
    console.log(final)
    res.render('User/show' ,{user, final} )
})

app.get('/:id/new',(req,res)=>{
    const id =req.params.id;
    res.render('Tweet/new',({id}))
})

app.post('/:id',async(req,res)=>{
    const id =req.params.id;
    const {text, like} = req.body;
    const user = await User.findById(id)
    const tweet = new Tweet({
        body: text,
        like: like
    })
    tweet.user = user
    await tweet.save()
    res.redirect(`${id}`)
})






app.get('/',(req,res)=>{
    res.render('main')
})


app.listen(8080 , (req,res)=>{
    console.log('connected to port 8080')
})