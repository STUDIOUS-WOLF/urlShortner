const mongoose=require("mongoose")
const url_schema=new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    longUrl:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
    },

    visitHistory:[{timestamp:{type:Number}}]
   
},
{timestamps:true}
)
const URL=mongoose.model("url",url_schema)
module.exports=URL