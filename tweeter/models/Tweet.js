const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;


const tweetSchema  = new Schema({
    
    body:String, 
    like:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})



module.exports = mongoose.model("Tweet", tweetSchema)