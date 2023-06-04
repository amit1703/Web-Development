const express = require("express");
const app = express();


app.use(express.json)//for parsing json data 
app.use(express.urlencoded({extended: true}))//for parsing urlencoded
// a must line of code for post fucntion , to the req.body to work.

app.get('/', (req,res)=>{
    res.render('home.ejs')
})
app.post('/tacos', (req,res)=>{
    console.log(req.body)
    res.render('tacos.ejs');
})

app.listen(3000, ()=>{
    console.log('listning for port 3000')
})