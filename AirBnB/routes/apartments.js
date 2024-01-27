const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment')
const AppError = require('../AppError')


router.get('/', async (req,res,next)=>{
    // the next line is for the middleware to run (w.o the next line the middleware wont run)
    try{
    const apartments = await Apartment.find({})
    res.render('Apartment/index' ,{apartments})
    }catch(e){
        //when the code cant be execute next(e) will run, the error middleware will work and send an msg and status code error for the specific error (e)
        next(e)
    }
})

router.get('/new',(req,res,next)=>{
    //sends to the new Apartment form
    try{
    res.render('Apartment/new')
}catch(e){
    next(e)
}
}) 
router.post('/',  async(req,res,next)=>{
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

router.get('/:id', async (req,res,next)=>{
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

router.get('/:id/edit', async(req,res,next)=>{
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
router.put('/:id', async(req,res,next)=>{
    try{
          const {id} = req.params;
        const apartment = await Apartment.findByIdAndUpdate(id, {...req.body.apartment})
        console.log(apartment.title)
        res.redirect(`/apartments/${apartment._id}`)
    }catch(e){
        next(e)
    }
    })
    router.use((err, req ,res ,next)=>{ // need checking if can be deleted 
        //when will be an express error(like route exist but there is an error there) then this function will run
        console.log('error ', err)
        next(err)
    })
    router.use((err, req ,res , next)=>{
    
        const { message = 'somthing went wrong', status = 500} = err;
        res.status(status).render('error',{message, status})
    })

module.exports = router