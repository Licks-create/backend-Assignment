const mongoose=require("mongoose")
const modelschema=mongoose.Schema;

const userSchema=new modelschema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})
module.exports=mongoose.model('users',userSchema)