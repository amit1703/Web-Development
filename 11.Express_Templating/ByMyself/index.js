const { resolve4 } = require('dns');
const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')))// for all the files , css , html, js , img , that will immidatly serve


app.set('view engine' , 'ejs');
// if running the server from outside the dir, views wont be found,
// so this line will add the curr path and then /views to found the views location
app.set('views', path.join(__dirname, '/views'))

app.get('/' , (req,res)=>{// this fucn is a callback, res,req is must here!! ,
    // if this was secssuful, send hello to user
    res.render('home.ejs')// rendering a ejs temlate (showing on this certain location a html file!)
})

app.get('/i/:name', (req,res)=>{
    const {name} = req.params;
    const datas = data[name]
    if(datas)//makes sure its aint undefind
    res.render('info.ejs' , {datas})
    else
    res.send('page not found 404')
})
app.get('/names' , (req,res)=>{
    const names = ['amit', 'romi','tahel','agam','yuval']
    res.render('names.ejs', {names});
})

app.get('/rand', (req,res)=>{
    const randnum = Math.floor(Math.random() *10)+1// makes a random number
    res.render('rand.ejs',{rand : randnum , randnum});// send var randnum to template as rand 
}) 
app.get("*" , (req, res)=>{
    res.send('page not found 404')
})
app.listen('3000' , ()=>{
    console.log('Listning for port 3000!')
})
