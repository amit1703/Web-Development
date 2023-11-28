const mongoose = require('mongoose')
const Items = require('./models/Items')

mongoose.connect('mongodb://127.0.0.1:27017/Items');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('opened')
})


const p = Items({

    name: 'cup',
    price: 19
})
p.save()
.then((data)=>{
    console.log(data)
})