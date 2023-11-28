// this is the main file of this site.
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product')

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log(" mongo Connection open")
})
.catch(err=>{
    console.log(' mongo Error')
    console.log(err)
})

app.get('/home' , async (req ,res)=>{
    const allProducts = await Product.find({})
    console.log(allProducts)
    res.render('home.ejs',({allProducts}))
})
app.get('/home/:id' , async (req, res)=>{
    const {id} = req.params;
    const p  = await Product.findById({id})
    res.render('show')
})

app.listen(3000 , ()=>{
    console.log('PORT 3000')
})