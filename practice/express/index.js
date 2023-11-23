const express = require('express')
const app = express()
const path = require('path')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var users = [{Email: 'amit.izhari@gmail.com', user: "amit"}]

app.post('/',(req,res)=>{
    const {email , user} = req.body
    users.push(email , user)
    console.log('fefe')
    res.redirect('allUsers.ejs')
})

app.get('/',(req,res)=>{
    res.render('allUsers.ejs', {users})
})

app.get('/new',(req,res)=>{
    res.render('newUser.ejs')
})





app.listen('8080',(req,res)=>{
    console.log('on port 8080')
})