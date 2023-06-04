const express = require('express');
const app = express();
const path = require('path')



app.use(express.urlencoded({extended:true}))
app.use(express.json)

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, "views") );

const comments = [ 
    {
        username: 'amit',
        comment: 'tahel the goat'
    }, {
        username: 'romi',
        comment: 'take as to a walk'
    }, {
        username: 'agam',
     comment: '123131231'
    }, {
        username: 'yuval',
        comment: 'skymolator'
    }
]

app.get('/', (req,res)=>{
    res.render('home.ejs');
})

app.get('/comments', (req,res)=>{
    res.render('allcommends.ejs', {comments})
})




app.listen(8080 , ()=>{
    console.log('listening for port 8080')
})