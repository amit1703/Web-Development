const express = require('express');
const router = express.Router({ mergeParams: true });
const Apartment = require('../models/Apartment')
const Review = require('../models/Review')




router.post('/',  async(req,res,next)=>{
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

router.delete('/:idreview', async(req,res)=>{
    const { id, idreview } = req.params;
    await Apartment.findByIdAndUpdate(id, { $pull: { reviews: idreview } });
    await Review.findByIdAndDelete(idreview);
    res.redirect(`/apartments/${id}`);

})


module.exports = router