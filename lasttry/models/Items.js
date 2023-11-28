const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({

    name : String,
    price : Number

})

const Items  = mongoose.model('Items' , ItemSchema)

module.exports = Items;



