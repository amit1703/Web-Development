const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Apartment = require('./models/Apartment')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/AirBnB', {})//connection to mongoDB
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

app.get('/apartments', async (req,res)=>{

    const apartments = await Apartment.find({})
    res.render('Apartment/index.ejs' ,{apartments})
})

app.get('/apartments/new',(req,res)=>{
    //sends to the new Apartment form
    res.render('Apartment/new.ejs')
}) 

app.get('/apartments/:id', async (req,res)=>{
    const { id } = req.params;
    const apartment = await Apartment.findById(id)
    res.render('Apartment/show.ejs' ,{apartment})
})

app.get('/apartments/:id/edit', async(req,res)=>{
    //relate to edit a Apartment
    const { id } = req.params;
    const apartment = await Apartment.findById(id)
    res.render('Apartment/edit.ejs' ,{apartment})
})

app.put('/apartments/:id', async(req,res)=>{
    //updating the Apartment (error 30.12.23)
    const {id} = req.params;
    const apartment = await Apartment.findByIdAndUpdate(id , {...req.body.apartment})

    res.redirect('Apartment/show.ejs',{apartment})

})

app.post('/apartments', async(req,res)=>{
//relate to new Apartment
    const apartment = new Apartment(req.body.apartment)
    await apartment.save()
    const apartments = await Apartment.find({})
    res.redirect('Apartment/index.ejs', {apartments})
})

app.listen(3000, ()=>{
    console.log('on port 3000')
})