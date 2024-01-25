const mongoose = require('mongoose')
const User = require('../models/User')
const Tweet = require('../models/Tweet')

mongoose.connect('mongodb://localhost:27017/tweets', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



const comments=[
    'a nice one hahahah',
    'dumbfuck idiot',
    'i aint worried right now',
    'dont be so shy idiot',
    'i hate hoes',
    'ad mataii'
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const makecommnets = async()=>{
    await Tweet.deleteMany({})
    
    for(let i = 0; i<50 ; i++){
    const users = await User.find({})
    const likes = getRandomInt(100)
    const user = users[getRandomInt(users.length)]
    const text = comments[getRandomInt(comments.length)]
    const tweet = new Tweet({
        body: text,
        like: likes
    })
    tweet.user =user 
    await tweet.save()
}
}

makecommnets()
