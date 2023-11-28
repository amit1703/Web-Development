const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/moviesDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectio error:'));
db.once('open', function(){
    console.log('opened')
})

const moviesSchema = new mongoose.Schema({ // the blueprint of the models
    title: String, 
    year: Number,
    score: Number, 
    rating: String
})

 const Movie = mongoose.model('Movie', moviesSchema)

 
 Movie.insertMany([
        {title: "fast 1" , year:2000 , score: 9.2, rating: 'R'},
        {title: "fast 2", year: 2004, score: 8.8 , rating: 'R'},
        {title: 'fast 4', year: 2007 , score: 8.6, rating:"r" },
        {title: 'fast 5' , year: 2010, score:  9.6, rating: 'R' },
        {title: 'fast 3' , year: 1983 , score:  8.7, rating:'r' }

 ])
 .then(data =>{
    console.log('worked')
 })
 Movie.findOne({title: 'fast 2'})
.then(data =>{
    console.log(data)
})