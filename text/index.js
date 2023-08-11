const { render } = require('ejs');
const express = require('express')
const app = express();
const path = require('path');


app.set('view engine', 'ejs')//for templating
app.set('views', path.join(__dirname, 'views'))
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())

//lines 1-12 is must in every server 


//fakedata 
const users = [

    {
        name: 'amit',
        email : 'amit.izhari@gmail.com',
        password : 'tahel123'

    },
    {
        name: 'ron',
        email : 'ron.izhari@gmail.com',
        password : 'ron123'

    }
    ,{
        name: 'tahel',
        email : 'tahel.izhari@gmail.com',
        password : 'tahel1235'

    }
]



app.get("/",(req,res)=>{

    const {name,email , password} = req.body

    res.render('home' , name)
})

app.get('/allusers', (req,res)=>{
    res.render('allusers.ejs')
})

app.get("/register",(req,res)=>{
    res.render('register.ejs' , {users})
})

app.post('/' , (req,res)=>{
    const { name, email, password } = req.body;
    users.push({ name, email, password })
    res.redirect('/');
    console.log(users)
})
app.get("*",(req,res)=>{
    res.render('error')
})
app.listen(8080 , ()=>{
    console.log("listening for port 8080")
})