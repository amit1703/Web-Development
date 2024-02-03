const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose')


const userSchema = new Schema({

    email:{
        type: String,
        required: true
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:'Review'
    }]
   
})
userSchema.plugin(passport)// adding the passport module to our model

module.exports = mongoose.model('User', userSchema)