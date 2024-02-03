const express = require('express');
const router = express.Router();

const User = require('../models/user')
const Review = require('../models/review')


router.get('/:id',async(req,res)=>{

    const user = await User.findOne({username:req.body.username}).populate('reviews')

    res.render('Review/show',{user})

})


