const express = require('express');// server
const app = express();
const path = require('path')
const mongoose = require('mongoose')//db
const Apartment = require('./models/Apartment')
const ejsMate = require('ejs-mate')
const Review = require('./models/Review')

const AppError = require('./AppError')
const joi  = require('joi')// serverside errors (not in use rn...)

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


app.use((err, req ,res ,next)=>{ // need checking if can be deleted 
    //when will be an express error(like route exist but there is an error there) then this function will run
    console.log('error ', err)
    next(err)
})


app.get('/' , (req,res)=>{

    res.render('home')
})

app.get('/apartments', async (req,res,next)=>{
    // the next line is for the middleware to run (w.o the next line the middleware wont run)
    try{
    const apartments = await Apartment.find({})
    res.render('Apartment/index' ,{apartments})
    }catch(e){
        //when the code cant be execute next(e) will run, the error middleware will work and send an msg and status code error for the specific error (e)
        next(e)
    }
})

app.get('/apartments/new',(req,res,next)=>{
    //sends to the new Apartment form
    try{
    res.render('Apartment/new')
}catch(e){
    next(e)
}
}) 
app.post('/apartments',  async(req,res,next)=>{
    //relate to new Apartment
    try{
        const apartment = new Apartment(req.body)
        console.log(apartment.title)
        await apartment.save()
        res.redirect(`/apartments/${apartment._id}`)
    }
    catch(e){
        // if there is an error with adding a new apartment ,the middlware app.use(err) will run
        return next(e)
    }
    })

app.get('/apartments/:id', async (req,res,next)=>{
    try{
    const { id } = req.params;
    const reviews = await Apartment.findById(id).populate('reviews')
    const apartment = await Apartment.findById(id)
    if(!apartment){
       return next(new AppError('Apartment not found', 404))// w/o the return the next line will run and then we will get ejs error because there is no such an apramtment with this id
    }
    res.render('Apartment/show' ,{apartment, reviews})
}
catch(e){
    next(e)
}
})

app.get('/apartments/:id/edit', async(req,res,next)=>{
    //relate to edit a Apartment
    try
    {
    const { id } = req.params;
    const apartment = await Apartment.findById(id)
    res.render('Apartment/edit' ,{apartment})
}catch(e){
    next(e)
}
})

app.post('/apartments/:id/reviews',  async(req,res,next)=>{
    //relate to new review
    try{
        const text = req.body.text;
        const rating = req.body.rating;
        const apartment = await Apartment.findById(req.params.id);
        const review = await new Review({
            text:text,
            rating:rating
        });
        apartment.reviews.push(review)
        await review.save()
        await apartment.save()
        res.redirect(`/apartments/${req.params.id}`)
    }

    catch(e){
        // if there is an error with adding a new apartment ,the middlware app.use(err) will run
        return next(e)
    }
    })
app.put('/apartments/:id', async(req,res,next)=>{
try{
      const {id} = req.params;
    const apartment = await Apartment.findByIdAndUpdate(id, {...req.body.apartment})
    console.log(apartment.title)
    res.redirect(`/apartments/${apartment._id}`)
}catch(e){
    next(e)
}
})
app.delete('/apartments/:id/reviews/:idreview', async(req,res)=>{
    const review = await Review.findById(req.params.idreview)
    const user = await User.findById(req.params.id).populate('reviews')
    for(let review1 of user.reviews){
        const index = reviews.indexOf(review1);
        if(review.name === review1.name)
            reviews.splice(index, 1)

    }
    await user.save()
    await review.save()
    res.redirect(`/apartments/${req.params.id}`)

})
app.delete('/apartments/:id', async(req,res,next)=>{
try
{
    const {id} = req.params;
    await Apartment.findByIdAndDelete(id)

    res.redirect('/apartments')
}catch(e){
    next(e)
}

})

app.all('*', (req,res,next)=>{

    return next(new AppError('page not found',404))
})

app.use((err, req ,res , next)=>{

    const { message = 'somthing went wrong', status = 500} = err;
    res.status(status).render('error',{message, status})
})

app.listen(3000, ()=>{
    console.log('on port 3000')
})
















