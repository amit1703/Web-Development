
const path = require('path')
const mongoose = require('mongoose')
const Hotel = require('../models/hotel')
const city = require('./cities')
const {titles} = require('./seedHelper')
mongoose.connect('mongodb://localhost:27017/hotel-for-you', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const seedDB = async ()=>{

        await Hotel.deleteMany({})//deletes all items inside this model
        for(let i = 0; i<50 ; i++){
            const random1000 = Math.floor(Math.random() *1000);
            const randomTitle = Math.floor(Math.random() * titles.length)
            const hotel = new Hotel({
                title: titles[randomTitle],
                location: `${city[random1000].city}, ${city[random1000].state}`

            })
            await hotel.save()

        }
            
    }

    seedDB().then(()=>{
        mongoose.connection.close();
    })

