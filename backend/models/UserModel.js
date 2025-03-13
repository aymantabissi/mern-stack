import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        required:true,
        enum:["admin"  ,"user"]
    }

},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;