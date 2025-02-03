import mongoose from "mongoose";

const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Register=mongoose.model('Register',RegisterSchema);
export default Register;