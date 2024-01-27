const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment')
const Review = require('../models/Review')




router.post('/apartments/:id/reviews',  async(req,res,next)=>{
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

router.delete('/apartments/:id/reviews/:idreview', async(req,res)=>{
    const review = await Review.findById(req.params.idreview)
    const apartment = await Apartment.findById(req.params.id).populate('reviews')
    for(let review1 of user.reviews){
        const index = reviews.indexOf(review1);
        if(review._id === review1._id)
            reviews.splice(index, 1)

    }
    await apartment.save()
    await review.save()
    res.redirect(`/apartments/${req.params.id}`)

})


module.exports = router