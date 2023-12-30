const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Hotel = require('./models/hotel')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/hotel-for-you', {})//connection to mongoDB
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

app.get('/hotels', async (req,res)=>{

    const hotels = await Hotel.find({})
    res.render('Hotels/index.ejs' ,{hotels})
})

app.get('/hotels/new',(req,res)=>{
    //sends to the new hotel form
    res.render('Hotels/new.ejs')
}) 

app.get('/hotels/:id', async (req,res)=>{
    const { id } = req.params;
    const hotel = await Hotel.findById(id)
    res.render('Hotels/show.ejs' ,{hotel})
})

app.get('/hotels/:id/edit', async(req,res)=>{
    //relate to edit a hotel
    const { id } = req.params;
    const hotel = await Hotel.findById(id)
    res.render('Hotels/edit.ejs' ,{hotel})
})

app.put('/hotels/:id', async(req,res)=>{
    //updating the hotel (error 30.12.23)
    const {id} = req.params;
    const hotel = await Hotel.findByIdAndUpdate(id , {...req.body.hotel})

    res.redirect('Hotels/show.ejs',{hotel})

})

app.post('/hotels', async(req,res)=>{
//relate to new hotel
    const hotel = new Hotel(req.body.hotel)
    await hotel.save()
    const hotels = await Hotel.find({})
    res.redirect('Hotels/index.ejs', {hotels})
})

app.listen(3000, ()=>{
    console.log('on port 3000')
})