// in this file we adding new product to our db.
const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
    console.log(" mongo Connection open")
})
.catch(err=>{
    console.log(' mongo Error')
    console.log(err)
})


const new_product = Product({

    name : 'rapefruit', 
    price : 1.99,
    category : 'fruit'
})
new_product.save()
.then((data)=>{

    console.log(data)
})
.catch(err=>{
    console.log('Fruit Error')
    console.log(err)
})