const express = require('express')
const app = express()


app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/register', (req,res)=>{
    res.render('reg.ejs')
})


app.listen(8080,()=>{
    console.log('listning on port 8080!')
})