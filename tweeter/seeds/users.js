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


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
    }

const names = ['amit', 'romi', 'dror', 'orit','ori' , 'ran' , 'tahel','or' ,'guy', 'daniel', 'shay'
]

const makeusers = async()=>{
    for(let i = 0; i<50 ; i++){

    const age = getRandomInt(65)
    const name = names[getRandomInt(names.length)]
    const user = new User ({
        
        age: age, 
        name: name
    })
    await user.save()
}}
makeusers();