const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    body:{
        type: String,
        required: true
    }
    , rating:{
        type: Number,
        required: true
    },
    apartment:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Reviews', reviewSchema);