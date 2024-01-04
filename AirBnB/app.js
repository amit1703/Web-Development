const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Apartment = require('./models/Apartment')
const ejsMate = require('ejs-mate')
const Review = require('./models/Reviews')


const methodOverride = require('method-override');
const { render } = require('ejs');
app.use(methodOverride('_method'))

app.engine('ejs', ejsMate)

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

    res.render('home')
})

app.get('/apartments', async (req,res)=>{

    const apartments = await Apartment.find({})
    res.render('Apartment/index' ,{apartments})
})

app.get('/apartments/new',(req,res)=>{
    //sends to the new Apartment form
    res.render('Apartment/new')
}) 
app.post('/apartments', async(req,res)=>{
    //relate to new Apartment
        const apartment = new Apartment(req.body)
        console.log(apartment.title)
        await apartment.save()
        res.redirect(`/apartments/${apartment._id}`)
    })

app.get('/apartments/:id', async (req,res)=>{
    const { id } = req.params;
    const apartment = await Apartment.findById(id)
    res.render('Apartment/show' ,{apartment})
})

app.get('/apartments/:id/edit', async(req,res)=>{
    //relate to edit a Apartment
    const { id } = req.params;
    const apartment = await Apartment.findById(id)
    res.render('Apartment/edit' ,{apartment})
})

app.put('/apartments/:id', async(req,res)=>{
    //updating the Apartment (error 30.12.23)
    const {id} = req.params;
    const apartment = await Apartment.findByIdAndUpdate(id, {...req.body.apartment})
    console.log(apartment.title)
    res.redirect(`/apartments/${apartment._id}`)
})

app.delete('/apartments/:id', async(req,res)=>{

    const {id} = req.params;
    await Apartment.findByIdAndDelete(id)

    res.redirect('/apartments')


})

app.get('/apartments/:id/review', (req,res)=>{
    const {id} = req.params;
    res.render('Apartment/review.ejs',({id}))

})

app.post('/apartments/:id', async (req,res)=>{
 
    const {id} = req.params;
    const {username, body, rating} = req.body.review;
    const review = new Review({

        apartment , id,
        username: username,
        body: body,
        rating : rating
    })
    await review.save()
   res.redirect(`apartment/${id}`)

})

app.listen(3000, ()=>{
    console.log('on port 3000')
})