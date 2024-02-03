





// middleware for if user connected
module.exports.isLogged = async(req,res,next) =>{
    if(!req.session.user){
        res.redirect('/login')
    }
    else{
        next()
    }

}


