
const path = require('path')
const mongoose = require('mongoose')
const Apartment = require('../models/Apartment')
const city = require('./cities')
const {titles} = require('./seedHelper')
mongoose.connect('mongodb://localhost:27017/AirBnB', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const seedDB = async ()=>{

        await Apartment.deleteMany({})//deletes all items inside this model
        for(let i = 0; i<50 ; i++){
            const random1000 = Math.floor(Math.random() *1000);
            const randomTitle = Math.floor(Math.random() * titles.length)
            const apartment = new Apartment({
                price: 50,
                title: titles[randomTitle],
                location: `${city[random1000].city}, ${city[random1000].state}`,
                image: 'https://source.unsplash.com/collection/4807150',
                description: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos solutanumquam necessitatibus illo, quia, asperiores voluptatibus fugaeligendi facilis nihil, quisquam aperiam vel? Aspernatur nostrum iureenim minus! Unde, eius?",
            })
            await apartment.save()

        }
            
    }

    seedDB().then(()=>{
        mongoose.connection.close();
    })

