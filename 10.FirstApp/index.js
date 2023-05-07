const express = require("express");
const app = express()


// /cats => 'meow' /cat  is the path 
// /dogs => 'woof
// '/'

// we can res.send once!
// app.get is for a specsific path, when someone went to this path 
// certian code will run (the second param for get)
app.get('/cats', (req,res) =>{
    res.send('meow')
})
app.get('/dogs', (req,res) =>{
    res.send('woof')
}) 
app.get('/', (req , res ) =>{
    res.send('this is the home page')
})
//these are all post reqs , what usually in use. 

 app.listen(3000, ()=>{// this function will run only when the server is up ,
    // when the server is up , this code will run.

        console.log("listning for port 3000!")
 })