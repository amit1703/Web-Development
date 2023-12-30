const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Hotel = require('./models/hotel')

mongoose.connect('mongodb://localhost:27017/OneNightStay', {})//connection to mongoDB
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: true}))
// up to here, is a must 
app.get('/' , (req,res)=>{

    res.render('home.ejs')
})

app.get('/Hotels', async (req,res)=>{

    const hotels = await Hotel.find({})
    

    res.render('Hotels/index.ejs' ,{hotels})
})

app.get('/Hotels/new',(req,res)=>{
    res.render('Hotels/new.ejs')
}) 

app.get('/Hotels/:id', async (req,res)=>{
    const { id } = req.params;
    const hotel = await Hotel.findById(id)
    res.render('Hotels/show.ejs' ,{hotel})
})


app.post('/', async(req,res)=>{

    const hotel = new Hotel(req.body.hotel)
    await hotel.save()
    app.render('home.ejs')
})

app.listen(3000, ()=>{
    console.log('on port 3000')
})