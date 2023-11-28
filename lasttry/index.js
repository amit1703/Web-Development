const path = require('path')
const express = require('express')
const app = express()
const Items = require('./models/Items')

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Items');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('opened')
})


app.get('/main' , async (req,res)=>{
    const allItems = await Items.find({}) 
    res.render('main.ejs',({allItems}))
})

app.get('/main/:id',  async (req,res)=>{

    const { id } = req.params;
    const item =  await Items.findById(id)

    res.render('show.ejs', ({item}))

})

app.get('/main/new', (req, res)=>{


    res.render('newUser.ejs')
})

app.post('/main', async (req , res)=>{

    const newitem =  new Items(req.body());
    await  newitem.save()
    
    res.render('main.ejs')
})

app.get('*', (req,res)=>{
    
    res.send('ERROR!!!!!!!')
})
app.listen(3000 , (req,res)=>{
    console.log('on port 3000')
})
