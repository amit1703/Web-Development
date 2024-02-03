const express = require('express')
const router = express.Router();
const User = require('../models/user')


//we only requiring and not doing app.use because this will happen in the main file, when we export router, then the passort will be used, here is just for saving not activating 
const passport = require('passport');


router.get('/register', (req,res,next)=>{

    res.render('register')
})
router.post('/register', async(req,res,next)=>{

    const {email , password, username} = req.body;
    const user = new User({email:email, username: username})
    const newUser = await User.register(user,password);
    await newUser.save();

    //we dont need to require sessions in this file because the session will save in the main file , where we run all   
    req.session.user= newUser
    res.redirect('/')
})




//login
router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',passport.authenticate('local',{failureflash: true , failureRedirect:'/login'}) ,async(req,res)=>{
   
   const user = await User.findOne({username: req.body.username})
    req.session.user = user
   res.redirect('/')
})


module.exports = router;

