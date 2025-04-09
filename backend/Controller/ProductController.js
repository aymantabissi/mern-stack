
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
// Controller
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure image URL is full path
    res.json({
      ...product._doc,
      image: product.image ? `${req.protocol}://${req.get("host")}/${product.image}` : "",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

  

  export const createProduct = async (req, res) => {
    try {
      const { name, price, stock, category, description } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      // Validation for required fields
      if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Create the new product with the image path
      const newProduct = new Product({
        name,
        price,
        stock,
        category,
        description,
        image,
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Respond with success
      res.status(201).json({ success: true, message: "Product created", data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


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
export const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({}); // This deletes all products
        res.status(200).json({ success: true, message: "All products deleted successfully" });
    } catch (error) {
        console.error("Error deleting all products:", error);
        res.status(500).json({ success: false, message: "Failed to delete products" });
    }
};

export const searchProducts = async (req, res) => {
    const { search } = req.query; // Retrieve the search term from the query

    if (!search) {
        return res.status(400).json({ success: false, message: "Search term is required" });
    }

    try {
        // Search for products where name contains the search term (case-insensitive)
        const products = await Product.find({
            name: { $regex: search, $options: 'i' } // i for case-insensitive
        });

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

