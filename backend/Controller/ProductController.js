
import Product from "../models/Product.js";

export const getProducts= async (req,res)=>{
    try{
     const products= await Product.find({})
     res.status(200).json({success:true , data:products})
 
    }catch(error){
     console.log('error in fetching products : ' , error.message);
     res.status(500).json({success:false , message:"server error" })
 
    }
 }

export const createProduct=async(req,res)=>{
    const product=req.body; //user will send data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"please provide all feilds"})
    }
    const newProduct=new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({success:true , data:newProduct});
    }catch(error){
        console.error("error in create product", error.message);
        res.status(500).json({success:false , message:"server Error"})

    }
    
}

export const updateProduct= async (req,res)=>{
    const {id}=req.params;
    const product=req.body;
    try{
        const productUpdated= await Product.findByIdAndUpdate(id,product ,{new:true})
        res.status(200).json({success:true , data:productUpdated})

    }catch(error){
        res.status(500).json({success:false , message:"server error"})

    }
}
export const deleteProduct= async (req,res)=>{
    const {id}=req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true , message:"product deleted" })
    }catch(error){
        res.status(404).json({success:false, message:"product not found"})

    }
}