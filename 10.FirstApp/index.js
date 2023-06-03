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

 app.listen(8080, ()=>{// this function will run only when the server is up ,
    // when the server is up , this code will run.

        console.log("listning for port 8080!")
 })

 //express path params!

 app.get('/r/:subreddit', (req , res) =>{
    // the :subreddit is a param ,
    // if the path matches to /r/something run this function
    const {subreddit} = req.params; // the subreddit info 
    // /r/tahel , params = tahel 
    res.send(`browsing the ${subreddit}subreddit`); 
 
 }) 
 app.get('/r/:subreddit/:postID', (req , res) =>{
    // the :subreddit and :postId is a param ,
    // if the path matches to /r/something run this function
    const {subreddit , postID} = req.params; // the subreddit info 
    // /r/tahel , params = tahel 
    res.send(`browsing the ${subreddit} subreddit, post id ${postID}`); 
 
 }) 

 //quary strings
 app.get('/search', (req , res) =>{
    console.log(req.query)
    const {q} = req.query;
    res.send(`seach for: ${q}`)
    
 }) 