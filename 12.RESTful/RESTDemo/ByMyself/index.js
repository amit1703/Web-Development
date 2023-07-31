const express = require('express')
const app = express();


app.set(express.json);//for parsing to post as a json
app.set(express.urlencoded({extended:true}))// for parsing data to post (must)

//fakedata 
const comments = [
    {
        username:'amit',
        text:'this is a bad video'
    },
    {
        username:'ron',
        text:'this is a good video'
    },
    {
        username:'tahel',
        text:'i hate jews'
    },
    {
        username:'fakeuser',
        text:'for only 5$ you get a new house!'
    },

]

app.get('/comments' , (req,res)=>{
    res.render('index.ejs', ({comments}))
})
app.get('/comments/new' , (req,res)=>{
    res.render('newcomment.ejs' ,({comments}))
})
app.post('/comments' , (req,res)=>{
    const { username, comment } = req.body;//extracting the data from the post req(the form data)
    comments.push({ username, comment, id: uuid() })// adding the data to the db(to the object)
    res.redirect('/comments');
})

app.listen(3000 , ()=>{
    console.log('listining on port 3000!')

})